import { z } from "zod";

export const signupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid Email"),
    password: z.string().min(6, "Password must be a least 6 characters")
});

export const loginSchema = z.object({
  email: z.string().min(5, "Email is required").email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be a least 6 characters"),
});

export const emailValidationSchema = z.object({ email: z.string().min(5, "Email is required").email("Please enter a valid email address.") });

export type SignupFormData = z.infer<typeof signupSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type EmailFormData = z.infer<typeof emailValidationSchema>;
