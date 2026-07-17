"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState } from "react"
import { toast } from "sonner"
import { changePasswordFormType, changePasswordSchema } from "@/formSchema/changePassword.schema"
import changePassword from "@/apis/changePassword"
import { signOut } from "next-auth/react"
import { FaEye } from "react-icons/fa"
import { RiEyeCloseLine } from "react-icons/ri";

export default function ChangePasswordForm({ className }: React.ComponentProps<"form">) {
    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        password: false,
        rePassword: false,
    });
    function changeTypeInput(field: "currentPassword" | "password" | "rePassword") {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    }

    const FormChangePassword = useForm({
        defaultValues: {
            "currentPassword": "",
            "password": "",
            "rePassword": ""
        },
        resolver: zodResolver(changePasswordSchema)
    })
    const { register, handleSubmit, formState, reset } = FormChangePassword;
    async function handleChangePassword(value: changePasswordFormType) {
        const res = await changePassword(value);
        if (res.message === "success") {
            toast.success('Change Password has been successfully updated.', { position: 'top-center', duration: 3000 });
            reset();
            signOut({ callbackUrl: '/login' })
        }
        else if (res.message === "fail") {
            toast.success(res.errors.msg, { position: 'top-center', duration: 3000 });
        }
    }

    return (
        <form className={cn("grid gap-5", className)} onSubmit={handleSubmit(handleChangePassword)}>

            {/* currentPassword */}
            <div className="grid gap-2">
                <Label htmlFor="currentPassword" className="font-semibold text-green-900">Current Password</Label>
                <div className="relative">
                    <Input id="currentPassword" {...register("currentPassword")} type={showPassword.currentPassword ? "text" : "password"} placeholder="currentPassword" className={formState.errors.currentPassword ? 'ring-red-600' : ''} />
                    <Button type="button" className="bg-transparent border-0 shadow-none text-green-900 absolute top-0 right-0 ring-0 hover:bg-transparent hover:ring-0" onClick={() => changeTypeInput("currentPassword")}>
                        {showPassword.currentPassword ? <RiEyeCloseLine /> : <FaEye />}
                    </Button>
                </div>
                {formState.errors.currentPassword ? <p className="text-red-600 text-center my-1">{formState.errors.currentPassword.message}</p> : ''}
            </div>

            {/* Password */}
            <div className="grid gap-2">
                <Label htmlFor="password" className="font-semibold text-green-900">New Password</Label>
                <div className="relative">
                    <Input id="password" {...register("password")} type={showPassword.password ? "text" : "password"} placeholder="new password" className={formState.errors.password ? 'ring-red-600' : ''} />
                    <Button type="button" className="bg-transparent border-0 shadow-none text-green-900 absolute top-0 right-0 ring-0 hover:bg-transparent hover:ring-0" onClick={() => changeTypeInput("password")}>
                        {showPassword.password ? <RiEyeCloseLine /> : <FaEye />}
                    </Button>
                </div>
                {formState.errors.password ? <p className="text-red-600 text-center my-1">{formState.errors.password.message}</p> : ''}
            </div>

            {/* rePassword */}
            <div className="grid gap-2">
                <Label htmlFor="rePassword" className="font-semibold text-green-900">Re-Password</Label>
                <div className="relative">
                    <Input id="rePassword" {...register("rePassword")} type={showPassword.rePassword ? "text" : "password"} placeholder="rePassword" className={formState.errors.rePassword ? 'ring-red-600' : ''} />
                    <Button type="button" className="bg-transparent border-0 shadow-none text-green-900 absolute top-0 right-0 ring-0 hover:bg-transparent hover:ring-0" onClick={() => changeTypeInput("rePassword")}>
                        {showPassword.rePassword ? <RiEyeCloseLine /> : <FaEye />}
                    </Button>
                </div>
                {formState.errors.rePassword ? <p className="text-red-600 text-center my-1">{formState.errors.rePassword.message}</p> : ''}
            </div>


            {/* Buttons */}
            <div className="flex justify-center gap-3 pt-2">
                <Button type="submit" className="bg-green-700 font-semibold text-xl py-3 px-7 hover:bg-green-800 cursor-pointer transition-colors delay-700">
                    Save Profile Data
                </Button>
            </div>

        </form>
    )
}
