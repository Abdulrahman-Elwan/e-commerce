"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { addressFormSchema, AddressFormType } from "@/formSchema/addressForm.schema"
import postAddresses from "@/apis/postAddresses"
import React from "react"
import { toast } from "sonner"

export default function EditAddressForm({ className }: React.ComponentProps<"form">) {
    const addressDataForm = useForm({
        defaultValues: {
            "name": "",
            "details": "",
            "phone": "",
            "city": ""
        },
        resolver: zodResolver(addressFormSchema)
    })

    const { register, handleSubmit, formState, reset } = addressDataForm;
    
    async function handleAddressForm(value: AddressFormType) {
        const res= await postAddresses(value);
        if(res.status === "success"){
            toast.success(res.message , { position: 'top-center', duration: 3000 });
            reset();
        }
    }

    return (
        <form className={cn("grid gap-5", className)} onSubmit={handleSubmit(handleAddressForm)}>

            {/* Address Name */}
            <div className="grid gap-2">
                <Label htmlFor="name" className="font-semibold text-green-900">Address Name</Label>
                <Input id="name" {...register("name")} placeholder="Home" className={formState.errors.name ? 'ring-red-600' : ''} />
                {formState.errors.name ? <p className="text-red-600 text-center my-1">{formState.errors.name.message}</p> : ''}
            </div>

            {/* Phone */}
            <div className="grid gap-2">
                <Label htmlFor="phone" className="font-semibold text-green-900">Phone Number</Label>
                <Input id="phone" {...register("phone")} type="tel" placeholder="01010700700" className={formState.errors.phone ? 'ring-red-600' : ''} />
                {formState.errors.phone ? <p className="text-red-600 text-center my-1">{formState.errors.phone.message}</p> : ''}
            </div>

            {/* City */}
            <div className="grid gap-2">
                <Label htmlFor="city" className="font-semibold text-green-900">City</Label>
                <Input id="city" {...register("city")} placeholder="Giza" className={formState.errors.city ? 'ring-red-600' : ''} />
                {formState.errors.city ? <p className="text-red-600 text-center my-1">{formState.errors.city.message}</p> : ''}
            </div>

            {/* Details */}
            <div className="grid gap-2">
                <Label htmlFor="details" className="font-semibold text-green-900">Address Details</Label>
                <textarea id="details" {...register("details")} rows={4} placeholder="Apartment, Street, Building..."
                    className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600 ${formState.errors.details ? 'ring-red-600' : ''}`}
                />
                {formState.errors.details ? <p className="text-red-600 text-center my-1">{formState.errors.details.message}</p> : ''}
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-3 pt-2">
                <Button type="submit" className="bg-green-700 font-semibold text-xl py-3 px-7 hover:bg-green-800 cursor-pointer transition-colors delay-700">
                    Save Address
                </Button>
            </div>

        </form>
    )
}
