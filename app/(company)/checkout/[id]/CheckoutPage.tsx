"use client"
import { useForm } from "react-hook-form"
import { Button, Label, TextInput, Radio } from "flowbite-react";
import { FaArrowRight } from "react-icons/fa6";
import { checkoutSchema, checkoutSchemaType } from "@/formSchema/checkout.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import checkoutCard from "@/CheckoutActions/checkoutCard";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import checkoutCachOrder from "@/CheckoutActions/checkoutCachOrder";
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
    const { id } = useParams();
    const router = useRouter();
    const formCheckout = useForm<checkoutSchemaType>({
        defaultValues: {
            "details": "",
            "phone": "",
            "city": "",
            "typePay": "",
        },
        resolver: zodResolver(checkoutSchema)
    })
    const { register, handleSubmit, formState } = formCheckout;
    async function handleSubmitformCheckout(values: checkoutSchemaType) {
        if (values.typePay === 'card') {
            const res = await checkoutCard(`${id}`, values);
            if (res.status === "success") {
                window.location.assign(res.session.url);
            } else {
                toast.error(`${res.message}`)
            }
        } else if (values.typePay === 'cash') {
            const res = await checkoutCachOrder(`${id}`, values);
            if (res.status === "success") {
                toast.success("Order Success 👌", { position: "top-center", duration: 3000 });
                router.push('/allorders')
            } else {
                toast.error(`${res.message}`)
            }
        }
    }

    return (
        <div className="container md:w-[85%] mx-auto my-10 md:my-auto">
            <div className="h-full flex flex-col justify-center items-center px-5">
                <div className="border min-w-full md:min-w-113 rounded-2xl p-2.5">
                    <h1 className="text-center font-bold text-3xl mt-2.5 text-green-800">
                        Checkout Form
                    </h1>
                    <hr className="my-5" />
                    <form className="flex max-w-md flex-col gap-4 w-full" onSubmit={handleSubmit(handleSubmitformCheckout)}>
                        <div>
                            <div className="mb-2 block">
                                <Label className="text-xl font-bold" htmlFor="phone">Phone:</Label>
                            </div>
                            <TextInput id="phone" {...register('phone')} type="tel" placeholder="Yor phone" />
                            {formState.errors.phone && <p className="text-center text-red-600 mt-3">{formState.errors.phone.message}</p>}
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label className="text-xl font-bold" htmlFor="city">City:</Label>
                            </div>
                            <TextInput id="city" {...register('city')} type="text" placeholder="Ciro" />
                            {formState.errors.city && <p className="text-center text-red-600 mt-3">{formState.errors.city.message}</p>}
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label className="text-xl font-bold" htmlFor="details">Details:</Label>
                            </div>
                            <TextInput id="details" {...register('details')} type="text" placeholder="Details..." />
                            {formState.errors.details && <p className="text-center text-red-600 mt-3">{formState.errors.details.message}</p>}
                        </div>
                        <div className="flex max-w-md items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Radio id="card" {...register('typePay')} value="card" className="text-green-600 focus:ring-green-600" defaultChecked />
                                <Label className="text-xl font-semibold" htmlFor="card">Pay by Card</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Radio id="cash" {...register('typePay')} value="cash" className="text-green-600 focus:ring-green-600" />
                                <Label className="text-xl font-semibold" htmlFor="cash">Cash</Label>
                            </div>
                        </div>
                        <hr className="my-1" />
                        <Button className="flex items-center gap-2.5 text-[18px] cursor-pointer bg-green-700 hover:bg-green-900 transition-colors duration-500" type="submit">Pay Now <FaArrowRight /> </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
