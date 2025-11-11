// lib/validations/auth.ts
import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const passwordSchema = z.object({
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
});

export const loginSchema = emailSchema.merge(passwordSchema);

export type LoginFormData = z.infer<typeof loginSchema>;
export type EmailFormData = z.infer<typeof emailSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;