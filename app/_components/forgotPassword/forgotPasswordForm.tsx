"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState } from "react"
import { toast } from "sonner"
import z from "zod";
import forgotPassword from "@/apis/forgotPassword"
import { TextInput } from "flowbite-react"
import { HiMail } from "react-icons/hi"
import VerifyResetCodeForm from "./verifyResetCodeForm"

const ForgotPasswordSchema = z.object({
    email: z
        .email()
        .nonempty("this field can't empty")
        .min(7, "Field must be at least 7 characters.")
        .max(100, "Field must be at most 100 characters."),
})
export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>

export default function ForgotPasswordForm({ className }: React.ComponentProps<"form">) {
    const [isVerifyCode, setisVerifyCode] = useState<boolean>(true)
    const ForgotPassword = useForm({
        defaultValues: {
            "email": ""
        },
        resolver: zodResolver(ForgotPasswordSchema)
    })
    const { register, handleSubmit, formState } = ForgotPassword;

    async function handleForgotPassword(value: ForgotPasswordSchemaType) {
        const res = await forgotPassword(value);
        if (res.statusMsg === "success") {
            toast.success(res.message, { position: 'top-center', duration: 3000 });
            setisVerifyCode(false);
        }
        else if (res.statusMsg === "fail") {
            toast.success(res.message, { position: 'top-center', duration: 3000 });
        }
    }

    return (
        <>
            {isVerifyCode ?
                <div>
                    <div className="p-4">
                        <form className={cn("grid gap-5", className)}>
                            <div className="max-w-md">
                                <div className="mb-2 block">
                                    <Label htmlFor="email">Your email</Label>
                                </div>
                                <TextInput id="email" {...register('email')} type="email" rightIcon={HiMail} placeholder="example@example.com" />
                                {formState.errors.email && <p className="text-red-500 text-center w-full">{formState.errors.email.message}</p>}
                            </div>
                            {/* Buttons */}
                            <div className="flex justify-center gap-3 pt-2">
                                <Button type="button" onClick={handleSubmit(handleForgotPassword)} className="bg-green-700 font-semibold text-xl py-3 px-7 hover:bg-green-800 cursor-pointer transition-colors delay-700">
                                    Forgot Password
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
                :
                <VerifyResetCodeForm />
            }
        </>
    )
}
