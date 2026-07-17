"use client"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { FaEye } from "react-icons/fa"
import { useState } from "react"
import UserAddressesCard from "./userAddressesCard"

export function ShowUserAddresses() {
    const [open, setOpen] = useState(false)

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger>
                <FaEye className="text-green-900 text-2xl cursor-pointer" />
            </DrawerTrigger>
            <DrawerContent className="block w-[95%] md:w-120 mx-auto mb-[15%] md:mb-[5%] ease-in rounded-2xl h-auto">
                <DrawerHeader className="text-left">
                    <DrawerTitle className="font-bold text-2xl text-green-900">User Addresses</DrawerTitle>
                </DrawerHeader>
                <UserAddressesCard />
            </DrawerContent>
        </Drawer>
    )
}

