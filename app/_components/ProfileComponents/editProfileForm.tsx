"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { toast } from "sonner"
import { profileFormSchema, ProfileFormType } from "@/formSchema/profileForm.schema"
import postProfile from "@/apis/postProfile"

export default function EditProfileForm({ className }: React.ComponentProps<"form">) {
    const ProfileDataForm = useForm({
        defaultValues: {
            "name": "",
            "email": "",
            "phone": "",
        },
        resolver: zodResolver(profileFormSchema)
    })
    const { register, handleSubmit, formState, reset } = ProfileDataForm;
    async function handleProfileForm(value: ProfileFormType) {
        const res= await postProfile(value);
        if(res.message === "success"){
            toast.success('Profile information has been successfully updated.' , { position: 'top-center', duration: 3000 });
            reset();
        }
        else if(res.message === "fail"){
            toast.success(res.errors.msg , { position: 'top-center', duration: 3000 });
        }
    }

    return (
        <form className={cn("grid gap-5", className)} onSubmit={handleSubmit(handleProfileForm)}>

            {/* Name */}
            <div className="grid gap-2">
                <Label htmlFor="name" className="font-semibold text-green-900">Name</Label>
                <Input id="name" {...register("name")} placeholder="Your full name" className={formState.errors.name ? 'ring-red-600' : ''} />
                {formState.errors.name ? <p className="text-red-600 text-center my-1">{formState.errors.name.message}</p> : ''}
            </div>

            {/* Email */}
            <div className="grid gap-2">
                <Label htmlFor="email" className="font-semibold text-green-900">Email</Label>
                <Input id="email" type="email" {...register("email")} placeholder="example@gmail.com" className={formState.errors.email ? 'ring-red-600' : ''} />
                {formState.errors.email ? <p className="text-red-600 text-center my-1">{formState.errors.email.message}</p> : ''}
            </div>

            {/* Phone */}
            <div className="grid gap-2">
                <Label htmlFor="phone" className="font-semibold text-green-900">Phone Number</Label>
                <Input id="phone" {...register("phone")} type="tel" placeholder="01010700700" className={formState.errors.phone ? 'ring-red-600' : ''} />
                {formState.errors.phone ? <p className="text-red-600 text-center my-1">{formState.errors.phone.message}</p> : ''}
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
