import z from "zod";

export const RegisterSchema = z.object({
    name: z
        .string()
        .nonempty("this field can't empty")
        .min(3, "name must be at least 3 characters.")
        .max(32, "name must be at most 32 characters."),
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
    rePassword: z
        .string()
        .nonempty("this field can't empty"),
    phone: z.string()
        .nonempty("this field can't empty").regex(/^01[0251][0-9]{8}$/, 'Please enter a valid Egyptian phone number')
}).refine((object) => object.password === object.rePassword, {
    path: ['rePassword'],
    error: 'password & password not match !!'
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>