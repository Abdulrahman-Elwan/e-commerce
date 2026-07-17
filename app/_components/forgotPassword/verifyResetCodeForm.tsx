"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { toast } from "sonner"

import { TextInput } from "flowbite-react"
import verifyResetCode from "@/apis/verifyResetCode"
import ResetPassword from "./resetPasswordForm"


export default function VerifyResetCodeForm() {
    const [isVerifyCode, setIsVerifyCode] = useState<boolean>(false);
    const VerifyResetCode = useForm({
        defaultValues: {
            "resetCode": ""
        }
    })
    const { register, handleSubmit, formState } = VerifyResetCode;

    async function handleVerifyResetCode(value: { "resetCode": string }) {
        const res = await verifyResetCode(value);
        if (res.status === 'Success') {
            setIsVerifyCode(true);
        }
        else if (res.status === "fail") {
            toast.success(res.message, { position: 'top-center', duration: 3000 });
        }
    }

    return (
        <div>
            {!isVerifyCode ?
                <div>
                    <div className="p-4">
                        <form className="flex flex-col gap-2">
                            <div className="w-full mx-auto">
                                <div className="mb-2 block">
                                    <Label htmlFor="verifyCode">Veirfy Code</Label>
                                </div>
                                <TextInput id="verifyCode" {...register('resetCode')} type="text" placeholder="Verify Code" />
                                {formState.errors.resetCode && <p className="text-red-500 text-center w-full">{formState.errors.resetCode.message}</p>}
                            </div>
                            {/* Buttons */}
                            <div className="flex justify-center gap-3 pt-2">
                                <Button type="button"
                                    onClick={handleSubmit(handleVerifyResetCode)}
                                    className="bg-green-700 font-semibold text-xl py-3 px-7 hover:bg-green-800 cursor-pointer transition-colors delay-700">
                                    Confirm Code
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
                :
                <ResetPassword />
            }
        </div>
    )
}
