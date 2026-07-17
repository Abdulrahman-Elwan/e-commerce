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
import AddReviewForm from "./addReviewForm"

export function AddReviewButton({productId} : {productId : string}) {
    const [open, setOpen] = React.useState(false)

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger className="w-full cursor-pointer">
                <span className="block w-full min-w-full text-white h-auto text-xl font-semibold px-3 py-1.5 rounded-2xl text-center bg-green-700 hover:bg-green-800 hover:scale-105 transition-all duration-500 ease-in-out">
                    Add Review
                </span>
            </DrawerTrigger>
            <DrawerContent className="block w-[95%] md:w-120 mx-auto mb-[15%] md:mb-[5%] ease-in rounded-2xl h-auto">
                <DrawerHeader className="text-left">
                    <DrawerTitle className="font-bold text-2xl text-green-900">Edit Profile</DrawerTitle>
                    <DrawerDescription>
                        Share your experience with this product. Your honest review helps other customers make better purchasing decisions.
                    </DrawerDescription>
                </DrawerHeader>
                <AddReviewForm productId={productId} />
            </DrawerContent>
        </Drawer>
    )
}
