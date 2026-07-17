import { z } from "zod";

export const addressFormSchema = z.object({
    name: z
        .string()
        .min(3, "Address name must be at least 3 characters")
        .max(50, "Address name must not exceed 50 characters"),

    details: z
        .string()
        .min(5, "Address details must be at least 5 characters")
        .max(200, "Address details must not exceed 200 characters"),

    phone: z
        .string()
        .regex(
            /^01[0125][0-9]{8}$/,
            "Please enter a valid Egyptian phone number"
        ),

    city: z
        .string()
        .min(2, "City name must be at least 2 characters")
        .max(50, "City name must not exceed 50 characters"),
});

export type AddressFormType = z.infer<typeof addressFormSchema>;