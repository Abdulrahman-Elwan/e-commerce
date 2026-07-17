import z from "zod";


export const loginSchema = z.object({
    email: z
        .email()
        .nonempty("this field can't empty")
        .min(7, "Field must be at least 7 characters.")
        .max(100, "Field must be at most 100 characters."),
    password: z
        .string()
        .nonempty("this field can't empty")
        .min(6, "Field must be at least 6 characters.")
        .max(100, "Field must be at most 100 characters."),
})

export type loginSchemaType = z.infer<typeof loginSchema>

