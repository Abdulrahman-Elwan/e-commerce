"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RegisterSchema, RegisterSchemaType } from "@/formSchema/registerSchema"
import { useRouter } from "next/navigation"
import BGimage from "@/public/bg-form.webp"
import Link from "next/link"

export default function RegisterPage() {
    const router = useRouter();
    const form = useForm<RegisterSchemaType>({
        defaultValues: {
            "name": "",
            "email": "",
            "password": "",
            "rePassword": "",
            "phone": ""
        },
        resolver: zodResolver(RegisterSchema)
    })

    async function handleSubmitRegister(values: RegisterSchemaType) {
        try {
            const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            const data = await response.json();
            if (!response.ok) {
                toast.error(data.errors?.msg || data.message || "Something went wrong ❌", {
                    position: "top-center",
                    duration: 3000
                })
                return
            }
            if (data.message === "success") {
                toast.success("Account has been created", { position: "top-center", duration: 3000 });
                router.push('/login')
            }
        } catch (err) {
            return (err);
        }
    }

    return (
        <div className="relative h-[calc(100vh-96px)] flex items-center justify-center bg-cover bg-center px-4 py-10"
            style={{ backgroundImage: `url(${BGimage.src})`, }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-green-950/5"></div>

            <Card className="relative z-10 w-full max-w-md rounded-3xl border-0 backdrop-blur-xl shadow-2xl bg-white/10">
                <CardHeader className="space-y-4">
                    <div>
                        <CardTitle className="text-center text-4xl font-bold text-green-700">
                            Create Account ✨
                        </CardTitle>
                        <p className="mt-2 text-center text-gray-500">
                            Join FreshCart and start shopping today
                        </p>
                    </div>
                </CardHeader>

                <CardContent>
                    <form id="form-rhf-demo" className="space-y-5" onSubmit={form.handleSubmit(handleSubmitRegister)} >
                        <FieldGroup>

                            {/* Name */}
                            <Controller name="name" control={form.control} render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel className="font-semibold">
                                        Full Name
                                    </FieldLabel>
                                    <div className="relative">
                                        <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                        <Input {...field} autoComplete="off" placeholder="Enter your full name" className="pl-11 h-12" />
                                    </div>
                                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                </Field>
                            )}
                            />

                            <div className="flex items-center gap-2.5">
                                {/* Email */}
                                <div>
                                    <Controller name="email" control={form.control} render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel className="font-semibold">Email Address</FieldLabel>
                                            <div className="relative">
                                                <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                                <Input {...field} type="email" autoComplete="off" placeholder="Enter your email" className="pl-11 h-12" />
                                            </div>
                                            {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                        </Field>
                                    )}
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <Controller name="phone" control={form.control} render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel className="font-semibold">Phone Number</FieldLabel>
                                            <div className="relative">
                                                <i className="fa-solid fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                                <Input {...field} type="tel" autoComplete="off" placeholder="Enter your phone number" className="pl-11 h-12" />
                                            </div>
                                            {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                        </Field>
                                    )}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2.5">
                                {/* Password */}
                                <Controller name="password" control={form.control} render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel className="font-semibold">Password</FieldLabel>
                                        <div className="relative">
                                            <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                            <Input {...field} type="password" autoComplete="off" placeholder="Create password" className="pl-11 h-12" />
                                        </div>
                                        {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                    </Field>
                                )}
                                />

                                {/* Confirm Password */}
                                <Controller name="rePassword" control={form.control} render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel className="font-semibold">Confirm Password</FieldLabel>
                                        <div className="relative">
                                            <i className="fa-solid fa-shield-halved absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                            <Input {...field} type="password" autoComplete="off" placeholder="Confirm password" className="pl-11 h-12" />
                                        </div>
                                        {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                    </Field>
                                )}
                                />
                            </div>
                        </FieldGroup>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col gap-5 backdrop-blur-xl bg-white/5">
                    <Button type="submit" form="form-rhf-demo" className="cursor-pointer h-12 w-full rounded-xl bg-green-700 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] hover:bg-green-800" >
                        Create Account
                    </Button>
                    <p className="text-center text-sm text-gray-500">
                        Already have an account?
                        <Link href="/login" className="ml-2 font-semibold text-green-700 hover:underline">
                            Login
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
