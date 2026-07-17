import { z } from "zod";

export const changePasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(6, "Current password must be at least 6 characters")
        .max(30, "Current password must not exceed 30 characters"),

    password: z
        .string()
        .min(6, "New password must be at least 6 characters")
        .max(30, "New password must not exceed 30 characters"),

    rePassword: z
        .string()
        .min(6, "Please confirm your new password"),
}).refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
});

export type changePasswordFormType = z.infer<typeof changePasswordSchema>;