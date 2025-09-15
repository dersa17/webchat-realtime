import { Response, Request } from "express";
import * as schemas from "../schemas/auth.schema";
import User from "../models/user.model";
import { generateToken } from "../lib/utils";
import { ZodError } from "zod";
import { sendWelcomeEmail } from "../emails/emailHandlers";
import { ENV } from "../lib/env";

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
