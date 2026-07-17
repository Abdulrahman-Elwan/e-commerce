import z from "zod";

export const checkoutSchema = z.object({
    details: z
        .string()
        .min(10, "Details must be at least 10 characters.")
        .max(200, "Details must not exceed 200 characters."),

    phone: z
        .string()
        .regex(/^\d{8,15}$/, "Phone number must contain 8 to 15 digits."),

    city: z
        .string()
        .min(2, "City name must be at least 2 characters.")
        .max(50, "City name must not exceed 50 characters."),

    typePay: z.string('"Please select a payment method."')
});

export type checkoutSchemaType = z.infer<typeof checkoutSchema>