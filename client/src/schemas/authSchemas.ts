import { z } from "zod";

export const signupSchema = z.object({
  email: z.string()
    .nonempty("Email is required.")
    .email("Please enter a valid email address."),
    
  password: z.string()
    .nonempty("Password is required.")
    .min(6, "Password should be between 6 and 60 characters.")
    .max(60, "Password should be between 6 and 60 characters."),
});

export const loginSchema = z.object({
  email: z.string()
    .nonempty("Email is required.")
    .email("Please enter a valid email address."),
    
  password: z.string()
    .nonempty("Password is required.")
    .min(4, "Your password must contain between 4 and 60 characters.")
    .max(60, "Your password must contain between 4 and 60 characters."),
});

export const emailValidationSchema = z.object({
  email: z.string()
    .nonempty("Email is required.")
    .email("Please enter a valid email address."),
});

export const passwordValidationSchema = z.object({
  password: z.string().nonempty("Password is required.")
    .min(6, "Password should be between 6 and 60 characters.")
    .max(60, "Password should be between 6 and 60 characters."),
});

export type SignupFormData = z.infer<typeof signupSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type EmailFormData = z.infer<typeof emailValidationSchema>;
export type PasswordFormData = z.infer<typeof passwordValidationSchema>;