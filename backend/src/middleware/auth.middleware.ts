import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/user.model.js";
import { ENV } from "../lib/env.js";

// Interface custom untuk request yang punya user
export interface AuthRequest extends Request {
  user?: IUser;
}

export const protectRoute = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: "Unauthorized - No token provided" });

    const decoded = jwt.verify(token, ENV.JWT_SECRET as string);
    if (!decoded || typeof decoded === "string" || !("userId" in decoded)) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    const userId = (decoded as JwtPayload).userId;
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // ✅ sekarang aman, karena req: AuthRequest
    next();
  } catch (error) {
    console.error("Error in protectRoute Middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
