"use client"

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import ForgotPasswordForm from "./forgotPasswordForm"
import { useState } from "react";

export function ForgotPasswordButton() {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger className="w-full cursor-pointer flex justify-end">
                <span className="text-sm border-b cursor-pointer text-green-700 hover:underline">
                    Forgot Password?
                </span>
            </DrawerTrigger>
            <DrawerContent className="block w-[95%] md:w-120 mx-auto mb-[23%] md:mb-[10%] ease-in rounded-2xl h-auto">
                <DrawerHeader className="text-left">
                    <DrawerTitle className="font-bold text-2xl text-green-900">Forgot Password</DrawerTitle>
                </DrawerHeader>
                <ForgotPasswordForm />
            </DrawerContent>
        </Drawer>
    )
}
