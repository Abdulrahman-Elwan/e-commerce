'use client'

import ClearUserCart from '@/CartActions/ClearUserCart'
import getLoggedUserCart from '@/CartActions/getLoggedUserCart'
import removeItem from '@/CartActions/removeItem'
import updateCartProductQuantity from '@/CartActions/updateCartProductQuantity'
import { Button } from '@/components/ui/button'
import { CountOfCart } from '@/context/countOfCart'
import { CartProductType } from '@/types/cart.type'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { MdOutlineDiscount, MdOutlineShoppingCartCheckout } from "react-icons/md";
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import applyCoupon from '@/CartActions/applyCopon'
import Link from 'next/link'
import { Spinner } from '@/components/ui/spinner'
import { TbShoppingCartExclamation } from "react-icons/tb";
import Image from 'next/image'

export default function CartPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isRemoveDisabled, setIsRemoveDisabled] = useState(false);
    const { isCount, setIsCountOfCart } = useContext(CountOfCart)!;
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [responsCouponMessage, setResponsCouponMessage] = useState('');
    const [cartid, setCartid] = useState('');

    const applySchema = z.object({
        couponName: z.string().min(2, 'It must be at least two characters long!')
    })
    const applyCouponForm = useForm({
        defaultValues: {
            couponName: ''
        },
        resolver: zodResolver(applySchema)
    })
    const { register, handleSubmit, formState } = applyCouponForm;

    async function UserCart() {
        const res = await getLoggedUserCart();
        try {
            setCartid(res.cartId);
            setTotalCartPrice(res.data.totalCartPrice);
            if (res.status === "success") setProducts(res.data.products);
            setIsLoading(false);
        }
        catch (err) {
            toast.error(`Error is : ${err}`);
            setIsLoading(false);
        }
    }

    async function ClearCart() {
        const { message } = await ClearUserCart();
        if (message === "success") {
            setProducts([]);
            setIsCountOfCart(0);
            UserCart();
        }
    }

    async function UpdateProduct(id: string, count: string, sign: string) {
        setIsDisabled(true)
        const res = await updateCartProductQuantity(id, count);
        if (res.status === "success") {
            setProducts(res.data.products);
            if (sign === '+') {
                setIsCountOfCart(isCount + 1)
            } else if (sign === '-') {
                setIsCountOfCart(isCount - 1)
            }
        }
        setIsDisabled(false);
        UserCart();
    }

    async function RemoveSpecificItem(id: string, count: number) {
        const res = await removeItem(id);
        setIsRemoveDisabled(true);
        try {
            if (res.status === "success") setProducts(res.data.products);
            setIsCountOfCart(isCount - count);
            setIsRemoveDisabled(false);
        }
        catch (err) {
            toast.error(`Error is : ${err}`);
            setIsRemoveDisabled(false);
        }
        UserCart();
    }

    async function handleApplyCoponSubmit(value: { couponName: string }) {
        const res = await applyCoupon(value);
        setResponsCouponMessage(res.message)
    }

    useEffect(() => {
        const UserCart = async () => {
            const res = await getLoggedUserCart();
            try {
                setCartid(res.cartId);
                setTotalCartPrice(res.data.totalCartPrice);
                if (res.status === "success") setProducts(res.data.products);
                setIsLoading(false);
            }
            catch (err) {
                toast.error(`Error is : ${err}`);
                setIsLoading(false);
            }
        }
        UserCart();
    }, [])

    if (isLoading) {
        return (<div className="h-75 flex items-center justify-center">
            <Spinner className="size-14" />
        </div>)
    }

    return (
        <>
            <div className="bg-gray-100/50">
                <div className="container md:w-[85%] mx-auto my-10">
                    {products.length > 0 ?
                        <div className='px-5 md:px-0'>
                            <div className="text-left font-bold text-3xl md:text-6xl uppercase text-green-600 mt-5 mb-5 ">
                                <h1>
                                    Shopping cart
                                </h1>
                            </div>
                            <div className='flex flex-col md:flex-row gap-5'>
                                <div className="w-full lg:w-2/3 space-y-5">
                                    {products.map((item: CartProductType) => (
                                        <div key={item._id} className="bg-white rounded-3xl shadow-lg border border-gray-200 p-5 hover:shadow-2xl transition-all duration-300">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                {/* Product Image */}
                                                <div className="w-full md:w-40 shrink-0">
                                                    <Image
                                                        src={item.product.imageCover}
                                                        alt={item.product.title}
                                                        width={200}
                                                        height={200}
                                                        className="w-full h-40 object-cover rounded-2xl"
                                                    />
                                                </div>

                                                {/* Product Details */}
                                                <div className="flex-1 flex flex-col">
                                                    <div>
                                                        <h2 className="text-2xl font-bold text-green-900 line-clamp-2">
                                                            {item.product.title}
                                                        </h2>
                                                        <p className="text-gray-500 mt-2">
                                                            Quantity : {item.count}
                                                        </p>
                                                    </div>
                                                    <div className="mt-6 flex flex-wrap items-center justify-between gap-5">
                                                        {/* Price */}
                                                        <div className='flex items-center gap-2.5'>
                                                            <p className="text-sm text-gray-500">
                                                                Price
                                                            </p>
                                                            <h3 className="text-xl font-bold text-green-700">
                                                                {item.price} EGP
                                                            </h3>
                                                        </div>

                                                        {/* Quantity */}
                                                        <div className="flex items-center rounded-full border border-gray-300 overflow-hidden">
                                                            <button disabled={isDisabled} onClick={() => UpdateProduct(
                                                                item.product.id,
                                                                `${item.count - 1}`,
                                                                "-"
                                                            )
                                                            }
                                                                className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 disabled:bg-gray-200 transition cursor-pointer"
                                                            >
                                                                -
                                                            </button>

                                                            {/* count */}
                                                            <span className="w-12 text-center font-bold text-lg">
                                                                {item.count}
                                                            </span>

                                                            <button disabled={isDisabled} onClick={() =>
                                                                UpdateProduct(
                                                                    item.product.id,
                                                                    `${item.count + 1}`,
                                                                    "+"
                                                                )
                                                            }
                                                                className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 disabled:bg-gray-200 transition cursor-pointer"
                                                            >
                                                                +
                                                            </button>
                                                        </div>

                                                        {/* Remove */}
                                                        <Button variant="destructive" disabled={isRemoveDisabled} onClick={() =>
                                                            RemoveSpecificItem(
                                                                item.product.id,
                                                                item.count
                                                            )
                                                        }
                                                            className="rounded-xl cursor-pointer"
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <Button onClick={ClearCart} className="w-full py-7 text-xl rounded-2xl bg-red-600 hover:bg-red-700 cursor-pointer">
                                        Clear Cart
                                    </Button>
                                </div>

                                <div className="w-full lg:w-1/3">
                                    <div className="sticky top-28 bg-white rounded-3xl shadow-xl border border-gray-200 p-6">
                                        <div className="text-slate-900 py-4 mb-2.5 border-b-2">
                                            <h2 className='text-3xl mb-4 text-green-700 font-bold'>
                                                Order Summary
                                            </h2>
                                            <h3 className='flex justify-between items-center font-semibold'>
                                                <span className='text-xl text-gray-500'>Subtotal</span>  <span>{totalCartPrice} EGP</span>
                                            </h3>
                                            <h3 className='flex justify-between items-center font-semibold'>
                                                <span className='text-xl text-gray-500'>Delivery Fee</span>  <span>0 EGP</span>
                                            </h3>
                                            <div className="promoCode w-full mt-2.5">
                                                <form className="flex w-full items-center gap-2.5" onSubmit={handleSubmit(handleApplyCoponSubmit)}>
                                                    <div className="relative w-full">
                                                        <MdOutlineDiscount className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                                        <Input {...register('couponName')} id="promoCode" type="text" placeholder="Add promo code" className="pl-10 focus-visible:ring-0" />
                                                    </div>
                                                    <Button type="submit" className="px-6 h-10 whitespace-nowrap">
                                                        Apply
                                                    </Button>
                                                </form>
                                                {formState.errors.couponName && <p className='text-center text-red-500 text-[17px] mt-2'>{formState.errors.couponName.message}</p>}
                                                {(responsCouponMessage.length > 0) && <p className='text-center text-red-500 text-[17px] mt-2'>{responsCouponMessage}</p>}
                                            </div>
                                        </div>
                                        <h3 className='flex justify-between items-center font-bold my-3 text-2xl'>
                                            <span>Total</span>  <span>{totalCartPrice} EGP</span>
                                        </h3>
                                        <Link href={`/checkout/${cartid}`}>
                                            <Button className='w-full rounded-4xl text-center py-5 text-xl cursor-pointer bg-green-900 hover:bg-green-950 transition-colors duration-700 ease-in-out'>
                                                Checkout Now <MdOutlineShoppingCartCheckout />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="flex flex-col items-center justify-center py-24 px-6">

                            {/* Icon */}
                            <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center mb-8">
                                <TbShoppingCartExclamation className='size-14' />
                            </div>

                            {/* Title */}
                            <h2 className="text-4xl font-bold text-gray-800">
                                Your Cart is Empty
                            </h2>

                            {/* Description */}
                            <p className="text-gray-500 text-center mt-4 max-w-md leading-7">
                                Looks like you haven&apos;t added anything to your shopping cart yet.
                                Discover our products and start shopping today.
                            </p>

                            {/* Button */}
                            <Link href="/products" className="mt-8">
                                <Button className="px-10 py-6 rounded-full text-lg bg-green-700 hover:bg-green-800 transition-all duration-300 cursor-pointer">
                                    Continue Shopping
                                </Button>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
