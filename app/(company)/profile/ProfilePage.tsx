'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { FaHeart, FaShoppingCart, FaBoxOpen, FaArrowRight } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { CountOfCart } from '@/context/countOfCart';
import { CountOfWishlist } from '@/context/countOfWishlist';
import getUserOrders from "@/orderActions/getUserOrders";
import { useSession } from "next-auth/react";
import { Order } from "@/types/order.type";
import getUserAddress from "@/apis/getUserAddress";
import getUserWishlist from "@/wishlistAction/getUserWishlist";
import { ProductType } from "@/types/product.type";
import Image from "next/image";
import { EditAddressesCard } from "@/app/_components/ProfileComponents/editAddressesCard";
import { EditProfileButton } from "@/app/_components/ProfileComponents/editProfileButton";
import { ShowUserAddresses } from "@/app/_components/ProfileComponents/showUserAddresses";
import { ChangePasswordButton } from "@/app/_components/ProfileComponents/changePasswordButton";

export default function ProfilePage() {
    const { isCount } = useContext(CountOfCart)!;
    const { isCountOfWishlist } = useContext(CountOfWishlist)!;
    const [myOrders, setMyOrders] = useState<Order[]>([]);
    const { data: session } = useSession();
    const [resultsAddress, setResultsAddress] = useState<number>(0);
    const [productsInWishlist, setProductsInWishlist] = useState<ProductType[]>([]);

    async function fetchWishlist() {
        const res = await getUserWishlist();
        if (res.data) setProductsInWishlist(res.data);
    }

    async function getAllOrder(userId: string) {
        const res = await getUserOrders(userId);
        setMyOrders(res);
    }

    async function fetchUserAddress() {
        const res = await getUserAddress();
        if (res.status === "success") setResultsAddress(res.results);
    }

    useEffect(() => {
        if (!session?.user?._id) return
        getAllOrder(session?.user?._id);
        fetchUserAddress();
        fetchWishlist();
    }, [session])

    return (
        <div className="container relative mx-auto w-[95%] lg:w-[90%] py-10">

            {/* Hero */}
            <div className="rounded-3xl bg-linear-to-r from-green-700 via-green-600 to-green-500 p-10 text-white shadow-xl">
                <h1 className="text-4xl md:text-5xl font-bold">
                    Welcome Back 👋
                </h1>
                <p className="mt-3 text-lg text-green-100">
                    Manage your account, orders and wishlist from one place.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                <Card className="rounded-3xl shadow-md hover:shadow-xl transition-all">
                    <CardContent className="p-6 flex justify-between items-center">
                        <div>
                            <p className="text-gray-500">
                                Wishlist
                            </p>
                            <h2 className="text-4xl font-bold mt-2">
                                {isCountOfWishlist ?
                                    <span>
                                        {isCountOfWishlist <= 9 ?
                                            <span>0{isCountOfWishlist}</span> : <span>{isCountOfWishlist}</span>
                                        }
                                    </span>
                                    :
                                    <span>0</span>}
                            </h2>
                        </div>
                        <FaHeart className="text-red-500 text-4xl" />
                    </CardContent>
                </Card>

                <Card className="rounded-3xl shadow-md hover:shadow-xl transition-all">
                    <CardContent className="p-6 flex justify-between items-center">
                        <div>
                            <p className="text-gray-500">
                                Cart
                            </p>
                            <h2 className="text-4xl font-bold mt-2">
                                {isCount ?
                                    <span>
                                        {isCount <= 9 ?
                                            <span>0{isCount}</span> : <span>{isCount}</span>
                                        }
                                    </span>
                                    :
                                    <span>0</span>}
                            </h2>
                        </div>
                        <FaShoppingCart className="text-green-700 text-4xl" />
                    </CardContent>
                </Card>

                <Card className="rounded-3xl shadow-md hover:shadow-xl transition-all">
                    <CardContent className="p-6 flex justify-between items-center">
                        <div>
                            <p className="text-gray-500">
                                Orders
                            </p>
                            <h2 className="text-4xl font-bold mt-2">
                                {myOrders ?
                                    <span>
                                        {myOrders.length <= 9 ?
                                            <span>0{myOrders.length}</span> : <span>{myOrders.length}</span>
                                        }
                                    </span>
                                    :
                                    <span>0</span>}
                            </h2>
                        </div>
                        <FaBoxOpen className="text-yellow-500 text-4xl" />
                    </CardContent>
                </Card>
                <Card className="rounded-3xl shadow-md hover:shadow-xl transition-all">
                    <CardContent className="p-6 flex justify-between items-center">
                        <div>
                            <p className="text-gray-500">
                                User Address
                            </p>
                            <h2 className="text-4xl font-bold mt-2">
                                {resultsAddress ?
                                    <span>
                                        {resultsAddress <= 9 ?
                                            <span>0{resultsAddress}</span> : <span>{resultsAddress}</span>
                                        }
                                    </span>
                                    :
                                    <span>0</span>}
                            </h2>
                        </div>
                        <div className="flex flex-col items-center gap-3.5">
                            <EditAddressesCard />
                            <ShowUserAddresses />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mt-10">

                {/* Left */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Orders */}
                    <Card className="rounded-3xl shadow-md bg-gray-100">
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center text-2xl">
                                <span className="font-bold">Recent Orders</span>
                                <Link href={'/allorders'} className="text-[14px] flex items-center gap-1.5 text-green-900 font-semibold group/parent">
                                    View All orders
                                    <FaArrowRight className="group-hover/parent:translate-x-2.5 transition-all duration-500 ease-in-out" />
                                </Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-3">
                            {
                                myOrders.length > 0 ?
                                    <>
                                        {myOrders.slice(0, 3).map((item) => (
                                            <div key={item._id} className="bg-white flex justify-between items-center py-4 border border-gray-300 px-2.5 rounded-2xl shadow-gray-400 shadow-lg mb-3">
                                                <div>
                                                    <h3 className="font-semibold">
                                                        Order #{item.id}
                                                    </h3>
                                                    <p className="text-gray-500 text-sm">
                                                        {item.isDelivered ? "Delivered" : "Processing"}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold  text-center text-green-700">
                                                        <span className="text-[10px] text-gray-600 font-medium">Total Order Price</span> <br />
                                                        {item.totalOrderPrice} EGP
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                    :
                                    <p className="text-center text-[17px]">No Orders Yet</p>
                            }
                        </CardContent>
                    </Card>

                    {/* Wishlist */}
                    <Card className="rounded-3xl shadow-md">
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center text-2xl">
                                <span className="font-bold">Wishlist</span>
                                <Link href="/wishlist" className="text-[14px] flex items-center gap-1.5 text-green-900 font-semibold group/parent">
                                    View All
                                    <FaArrowRight className="group-hover/parent:translate-x-2 transition-all duration-500 ease-in-out" />
                                </Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {
                                    myOrders.length > 0 ?
                                        <>
                                            {productsInWishlist.slice(0, 3).map((item) => (
                                                <div key={item._id} className="rounded-2xl border p-4 text-center hover:shadow-lg transition">
                                                    <div className="h-28 rounded-xl mb-3">
                                                        <Image src={item.imageCover} alt={item.slug} width={200} height={200} className="h-full w-24 mx-auto" />
                                                    </div>
                                                    <h4 className="font-bold text-green-900">
                                                        {item.title}
                                                    </h4>
                                                    <p className="text-green-500 text-[12px] font-semibold">
                                                        {item.price} EGP
                                                    </p>
                                                </div>
                                            ))}
                                        </>
                                        :
                                        <p className="text-center text-[17px]">No Product in Wishlist Yet</p>
                                }
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right */}
                <div className="space-y-8">

                    {/* Profile */}
                    <Card className="rounded-3xl shadow-md">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">
                                Account Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-gray-500">
                                    Full Name
                                </p>
                                <h3 className="font-semibold">
                                    {session?.user.name}
                                </h3>
                            </div>
                            <div>
                                <p className="text-gray-500">
                                    Email
                                </p>
                                <h3 className="font-semibold">
                                    {session?.user.email}
                                </h3>
                            </div>
                            <div>
                                <p className="text-gray-500">
                                    Role
                                </p>
                                <h3 className="font-semibold">
                                    {session?.user.role}
                                </h3>
                            </div>
                            <hr />
                            <div className=" flex flex-col gap-1">
                                <EditProfileButton />
                                <ChangePasswordButton />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="rounded-3xl shadow-md">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">
                                Quick Actions
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="flex flex-col gap-2.5">
                            <Link href={'/wishlist'} className="w-full justify-start border border-gray-300 p-2 rounded-2xl hover:shadow-lg hover:shadow-gray-400 hover:scale-105 transition-all duration-500 ease-in-out">
                                ❤️ My Wishlist
                            </Link>
                            <Link href={'/cart'} className="w-full justify-start border border-gray-300 p-2 rounded-2xl hover:shadow-lg hover:shadow-gray-400 hover:scale-105 transition-all duration-500 ease-in-out">
                                🛒 My Cart
                            </Link>
                            <Link href={'/allorders'} className="w-full justify-start border border-gray-300 p-2 rounded-2xl hover:shadow-lg hover:shadow-gray-400 hover:scale-105 transition-all duration-500 ease-in-out">
                                📦 My Orders
                            </Link>
                            <Link href={'/setting'} className="w-full justify-start border border-gray-300 p-2 rounded-2xl hover:shadow-lg hover:shadow-gray-400 hover:scale-105 transition-all duration-500 ease-in-out">
                                ⚙️ Account Settings
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
