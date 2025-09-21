import { z } from "zod";

export const signupSchema = z.object({
  fullName: z.string().nonempty("Full Name is Required"),
  password: z.string().nonempty("Password is Required").min(6, "Password must be at least 6 characters"),
  email: z.string().nonempty("Email is required").email("Invalid email"),
});

export const loginSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email"),
  password: z.string().nonempty("Password is Required"),
});


export const updateProfileSchema = z.object({
  profilePic: z.string().nonempty("Profile picture URL is required"),
});