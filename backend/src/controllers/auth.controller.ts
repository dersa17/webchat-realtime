import { Response, Request } from "express";
import * as schemas from "../schemas/auth.schema";
import User from "../models/user.model";
import { generateToken } from "../lib/utils";
import { ZodError } from "zod";
import { sendWelcomeEmail } from "../emails/emailHandlers";
import { ENV } from "../lib/env";
import { AuthRequest } from "../middleware/auth.middleware";
import cloudinary from "../lib/cloudinary";

export const signup = async (req: Request, res: Response) => {
    try {
        const validatedData = schemas.signupSchema.parse(req.body);

        const user = await User.findOne({ email: validatedData.email });
        if (user) return res.status(400).json({ message: "Email already exists" });

        const newUser = new User(validatedData);

        if (newUser) {
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);
            
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
            
            try {
                if(ENV.CLIENT_URL) {
                    await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL)
                }
            } catch (error) {
                console.error("Failed to send welcome email:", error)
            }

        } else {
            return res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                message: "Validation error",
                errors: error.issues, 
            });
        }

        console.error("Error in signup controller:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const login = async (req: Request, res: Response) => {
    try {
        const validatedData = schemas.loginSchema.parse(req.body)

        const user = await User.findOne({email: validatedData.email})
        if (!user) return res.status(400).json({message: "Invalid Email Or Password"})

        const isPasswordCorrect = await user.comparePassword(validatedData.password)
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Email Or Password" });

        generateToken(user._id, res) 

        res.status(400).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            prfilePic: user.profilePic
        })

    } catch (error) {

        if (error instanceof ZodError) {
            return res.status(400).json({
                message: "Validation error",
                errors: error.issues
            })
        }

        console.error("Error in login controller:", error)
        res.status(500).json({message: "Internal server error"})
    }
}


export const logout = async (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });

}

export const updateProfile = async (req: AuthRequest, res: Response) => {
    try {
        const validatedData = schemas.updateProfileSchema.parse(req.body.profilePic)

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: user not found in request" });
        }
        const userId = req.user._id

        const uploadResponse = await cloudinary.uploader.upload(validatedData.profilePic, { folder: "profile_pics" });

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true, select: "-password" }
        );

        res.status(200).json(updatedUser)

    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                message: "Validation error",
                errors: error.issues
            })
        }

        console.error("Error in updateProfile controller:", error)
        res.status(500).json({message: "Internal server error"})
    }   
}