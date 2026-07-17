import { z } from "zod";

export const profileFormSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name must not exceed 50 characters"),

    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email"),

    phone: z
        .string()
        .regex(
            /^01[0125][0-9]{8}$/,
            "Please enter a valid Egyptian phone number"
        ),

});

export type ProfileFormType = z.infer<typeof profileFormSchema>;