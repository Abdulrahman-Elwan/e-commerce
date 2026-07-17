"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { toast } from "sonner"
import { FaEye } from "react-icons/fa"
import { RiEyeCloseLine } from "react-icons/ri";
import z from "zod";
import { TextInput } from "flowbite-react"
import resetPassword from "@/apis/resetPassword"

const ResetPasswordSchema = z.object({
    newPassword: z
        .string()
        .min(6, "New password must be at least 6 characters")
        .max(30, "New password must not exceed 30 characters"),
    email: z
        .email()
        .nonempty("this field can't empty")
        .min(7, "Field must be at least 7 characters.")
        .max(100, "Field must be at most 100 characters."),
})
export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>

export default function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    function changeTypeInput() {
        setShowPassword(!showPassword);
    }

    const ResetPassword = useForm({
        defaultValues: {
            "email": "",
            "newPassword": ""
        },
        resolver: zodResolver(ResetPasswordSchema),
    })
    const { register, handleSubmit, formState } = ResetPassword;

    async function handleResetPassword(value: ResetPasswordSchemaType) {
        const res = await resetPassword(value);
        if (res.token) {
            toast.success('The password has been updated successfully.', { position: "top-center", duration: 3000 });
            window.location.assign('/login')
        } else if (res.statusMsg === "fail") {
            toast.success(res.message, { position: "top-center", duration: 3000 });
        }
    }
    return (
        <div>
            <div className="p-4">
                <form className="flex flex-col gap-2">
                    {/* Email */}
                    <div className="w-full mx-auto">
                        <div className="mb-2 block">
                            <Label htmlFor="email">E-mail</Label>
                        </div>
                        <TextInput id="email" {...register('email')} type="email" placeholder="Your Email" />
                        {formState.errors.email && <p className="text-red-500 text-center w-full">{formState.errors.email.message}</p>}
                    </div>

                    {/* new Password */}
                    <div className="w-full mx-auto">
                        <Label htmlFor="password" className="font-semibold text-green-900">New Password</Label>
                        <div className="relative">
                            <Input id="password" {...register("newPassword")} type={showPassword ? "text" : "password"} placeholder="new password" className={formState.errors.newPassword ? 'ring-red-600' : ''} />
                            <Button type="button" className="bg-transparent border-0 shadow-none text-green-900 absolute top-0 right-0 ring-0 hover:bg-transparent hover:ring-0" onClick={() => changeTypeInput()}>
                                {showPassword ? <RiEyeCloseLine /> : <FaEye />}
                            </Button>
                        </div>
                        {formState.errors.newPassword ? <p className="text-red-600 text-center my-1">{formState.errors.newPassword.message}</p> : ''}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center gap-3 pt-2">
                        <Button type="button"
                            onClick={handleSubmit(handleResetPassword)}
                            className="bg-green-700 font-semibold text-xl py-3 px-7 hover:bg-green-800 cursor-pointer transition-colors delay-700">
                            Confirm Code
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
