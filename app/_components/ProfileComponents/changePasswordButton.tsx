"use client"

import * as React from "react"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import ChangePasswordForm from "./changePasswordForm"

export function ChangePasswordButton() {
    const [open, setOpen] = React.useState(false)

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger className="w-full cursor-pointer">
                <span className="block min-w-full text-white font-medium h-auto text-[16px] px-3 py-1.5 rounded-2xl text-center bg-green-700 hover:bg-green-800 hover:scale-105 transition-all duration-500 ease-in-out">
                    Change Password
                </span>
            </DrawerTrigger>
            <DrawerContent className="block w-[95%] md:w-120 mx-auto mb-[15%] md:mb-[5%] ease-in rounded-2xl h-auto">
                <DrawerHeader className="text-left">
                    <DrawerTitle className="font-bold text-2xl text-green-900">Change Password</DrawerTitle>
                </DrawerHeader>
                <ChangePasswordForm className="p-4" />
            </DrawerContent>
        </Drawer>
    )
}
