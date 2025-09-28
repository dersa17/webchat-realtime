import { Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { ENV } from "./env.js";

export const generateToken = (userId: Types.ObjectId, res: Response) => {
    const token = jwt.sign({userId}, ENV.JWT_SECRET as string, {
        expiresIn: "7d",

    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //MS
        httpOnly: true, // Prevent XSS attack (Cookies can only be accessed by the server, they cannot be read or modified by JavaScript in the browser.)
        sameSite: "strict", // Prevent CSRF attack (cookies are only sent for requests from the same site (same origin))
        secure: ENV.NODE_ENV === "production" ? true : false
    })

    return token
}

