"use client"

import * as React from "react"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { FaPlus } from "react-icons/fa"
import EditAddressForm from "./editAddressForm"

export function EditAddressesCard() {
    const [open, setOpen] = React.useState(false)

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger>
                <FaPlus className="text-green-900 text-2xl cursor-pointer" />
            </DrawerTrigger>
            <DrawerContent className="block w-[95%] md:w-120 mx-auto mb-[15%] md:mb-[5%] ease-in rounded-2xl h-auto">
                <DrawerHeader className="text-left">
                    <DrawerTitle className="font-bold text-2xl text-green-900">Add Addresses</DrawerTitle>
                    <DrawerDescription>
                        Make changes to your Addresses here. Click save when you&apos;re done.
                    </DrawerDescription>
                </DrawerHeader>
                <EditAddressForm className="p-4" />
            </DrawerContent>
        </Drawer>
    )
}
