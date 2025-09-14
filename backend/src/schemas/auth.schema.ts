import { z } from "zod";

export const signupSchema = z.object({
  fullName: z.string().nonempty("Full Name is Required"),
  password: z.string().nonempty("Password is Required"),
  email: z.string().nonempty("Email is required").email("Invalid email"),
});

export const loginSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email"),
  password: z.string().nonempty("Password is Required"),
});
