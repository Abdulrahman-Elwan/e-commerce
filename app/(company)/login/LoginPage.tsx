"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { loginSchema, loginSchemaType } from "@/formSchema/login.schema"
import { signIn } from "next-auth/react"
import Link from "next/link"
import BGimage from "@/public/bg-form.webp"
import { ForgotPasswordButton } from "@/app/_components/forgotPassword/forgotPasswordButton"

export default function LoginPage() {
    const form = useForm({
        defaultValues: {
            "email": "",
            "password": ""
        },
        resolver: zodResolver(loginSchema)
    })
    async function handleSubmitLogin(values: loginSchemaType) {
        const response = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false,
            callbackUrl: '/'
        })

        if (response?.ok) {
            toast.success('Welcome back again', { position: "top-center", duration: 3000 });
            window.location.assign('/');
        } else {
            toast.error('An error occurred, please try again.', { position: 'top-center', duration: 3000 })
        }
    }

    return (
        <div className="relative h-[calc(100vh-96px)] flex items-center justify-center bg-cover bg-center px-4 py-10" style={{ backgroundImage: `url(${BGimage.src})`, }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-green-950/5"></div>

            {/* Login Card */}
            <Card className="relative z-10 w-full max-w-md rounded-3xl border-0 backdrop-blur-xl shadow-2xl bg-white/10">
                <CardHeader className="space-y-4">
                    <div>
                        <CardTitle className="text-center text-4xl font-bold text-green-700">
                            Welcome Back 👋
                        </CardTitle>
                        <p className="mt-2 text-center text-gray-500">
                            Login to continue shopping with FreshCart
                        </p>
                    </div>
                </CardHeader>

                <CardContent>
                    <form id="form-rhf-demo" className="space-y-6" onSubmit={form.handleSubmit(handleSubmitLogin)}>
                        <FieldGroup>

                            {/* Email */}
                            <Controller name="email" control={form.control} render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-email" className="font-semibold">
                                        Email Address
                                    </FieldLabel>
                                    <div className="relative">
                                        <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                        <Input {...field} id="form-rhf-email" type="email" autoComplete="off" placeholder="Enter your email" className="pl-11 h-12" />
                                    </div>
                                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                </Field>

                            )}
                            />

                            {/* Password */}
                            <Controller name="password" control={form.control} render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-password" className="font-semibold">
                                        Password
                                    </FieldLabel>
                                    <div className="relative">
                                        <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                        <Input {...field} id="form-rhf-password" type="password" autoComplete="off" placeholder="Enter your password" className="pl-11 h-12" />
                                    </div>
                                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                </Field>
                            )}
                            />

                        </FieldGroup>

                        <div className="w-full">
                            <ForgotPasswordButton />
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col gap-5 backdrop-blur-xl bg-white/5">
                    <Button type="submit" form="form-rhf-demo" className="h-12 w-full rounded-xl bg-green-700 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] hover:bg-green-800" >
                        Log In
                    </Button>
                    <p className="text-center text-sm text-gray-500">
                        Don`&apos;`t have an account?
                        <Link href="/register" className="ml-2 font-semibold text-green-700 hover:underline">
                            Register
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )

}
