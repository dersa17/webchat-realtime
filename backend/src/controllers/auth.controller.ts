import {Response, Request} from "express"
import * as schemas from "../schemas/auth.schema"
import User from "../models/user.model"
import { generateToken } from "../lib/utils"

export const signup = async (req: Request, res: Response) => {

    try {
        const validatedData = schemas.signupSchema.parse(req.body)

        const user = await User.findOne({ email: validatedData.email });
        if (user) return res.status(400).json({ message: "Email already exists" });
        const newUser = new User(validatedData)

        if (newUser) {
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });

        } else {
            res.status(400).json({message: "Invalid user data"})
        }
    } catch (error) {
        console.log("Error in signup controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}