import { z } from "zod";

export const signupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid Email"),
    password: z.string().min(6, "Password must be a least 6 characters")
});

export const loginSchema = z.object({
  email: z.string().email("Invalid Email"),
  password: z.string().min(6, "Password must be a least 6 characters"),
});


export const emailValidationSchema = z.object({ email: z.string().email("Please enter a valid email address.").min(5, "Email is required") });

// });

export type SignupFormData = z.infer<typeof signupSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type EmailFormData = z.infer<typeof emailValidationSchema>;
