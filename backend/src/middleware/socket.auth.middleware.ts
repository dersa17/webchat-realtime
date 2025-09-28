import { Socket } from "socket.io";
import jwt, { JwtPayload } from "jsonwebtoken";
import cookie from "cookie";
import User, { IUser } from "../models/user.model";
import { ENV } from "../lib/env";

// definisi payload JWT kustom
export interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

// extend socket biar bisa pakai socket.user & socket.userId
declare module "socket.io" {
  interface Socket {
    user?: IUser;     // bisa diganti UserDocument kalau mongoose kamu pakai Document
    userId?: string;
  }
}

export const socketAuthMiddleware = async (
  socket: Socket,
  next: (err?: Error) => void
) => {
  try {
    // ambil semua cookies dari header
    const cookieHeader = socket.handshake.headers.cookie;
    if (!cookieHeader) {
      console.log("Socket connection rejected: No cookies found");
      return next(new Error("Unauthorized - No Cookies Found"));
    }

    // parse cookies
    const cookies = cookie.parse(cookieHeader);
    const token = cookies["jwt"]; // ambil token dari cookie bernama jwt

    if (!token) {
      console.log("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized - No Token Provided"));
    }

    // verifikasi token
    const decoded = jwt.verify(token, ENV.JWT_SECRET as string) as CustomJwtPayload;

    if (!decoded.userId) {
      console.log("Socket connection rejected: Invalid token payload");
      return next(new Error("Unauthorized - Invalid Token"));
    }

    // cari user di database
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("Socket connection rejected: User not found");
      return next(new Error("User not found"));
    }

    // attach user info ke socket
    socket.user = user;
    socket.userId = user._id.toString();

    console.log(`Socket authenticated for user: ${user.fullName} (${user._id})`);

    next();
  } catch (error: any) {
    console.log("Error in socket authentication:", error.message);
    next(new Error("Unauthorized - Authentication failed"));
  }
};
