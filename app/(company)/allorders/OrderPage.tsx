'use client'
import getUserOrders from "@/orderActions/getUserOrders";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { HiOutlineCheckCircle, HiOutlineClock, HiOutlineTruck, } from "react-icons/hi";
import { FaCreditCard, FaMoneyBillWave, } from "react-icons/fa";
import { MdKeyboardArrowDown, } from "react-icons/md";
import { Order } from "@/types/order.type";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";

export default function OrderPage() {
    const [myOrder, setMyOrder] = useState<Order[]>([]);
    const { data: session } = useSession();
    const [load, setLoad] = useState<boolean>(true);

    useEffect(() => {
        if (!session?.user?._id) return;
        const fetchOrders = async () => {
            try {
                const res = await getUserOrders(session.user._id);
                setMyOrder(res);
            } catch (error) {
                alert(error);
            } finally {
                setLoad(false);
            }
        };
        fetchOrders();
    }, [session?.user?._id]);

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto max-w-7xl px-4">
                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800">
                            My Orders
                        </h1>
                        <p className="text-gray-500 mt-2 text-center md:text-start">
                            {myOrder.length} Orders Found
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0 rounded-xl bg-white shadow px-6 py-4">
                        <p className="text-sm text-gray-500">
                            Total Spent
                        </p>
                        <h2 className="text-3xl font-bold text-green-600">
                            {
                                myOrder.reduce(
                                    (sum, order) => sum + order.totalOrderPrice,
                                    0
                                )
                            } EGP
                        </h2>
                    </div>
                </div>
                {load ?
                    <div className="h-75 flex items-center justify-center">
                        <Spinner className="size-8" />
                    </div>
                    :
                    <>
                        {/* Empty */}
                        {myOrder.length === 0 && (
                            <div className="rounded-2xl bg-white p-16 text-center shadow">
                                <h2 className="text-3xl font-bold">
                                    🛒
                                </h2>
                                <p className="mt-4 text-gray-500">
                                    You haven`&apos;`t placed any orders yet.
                                </p>
                            </div>
                        )}
                        {/* Orders */}
                        <div className="space-y-8">
                            {myOrder.map((order) => (
                                <div
                                    key={order._id}
                                    className="overflow-hidden rounded-2xl bg-white shadow-lg"
                                >
                                    {/* Top */}
                                    <div className="flex flex-col lg:flex-row justify-between gap-6 border-b p-6">
                                        <div>
                                            <h2 className="text-xl font-bold">
                                                Order #{order.id}
                                            </h2>
                                            <p className="mt-2 text-sm text-gray-500">
                                                {new Date(order.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="flex items-center flex-wrap gap-3">
                                            <div>
                                                {order.isPaid ? (
                                                    <span className={`rounded-full block px-4 py-2 text-sm font-semibold ${order.isPaid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                                        <HiOutlineCheckCircle className="inline mr-1" />
                                                        Paid
                                                    </span>
                                                ) : (
                                                    <span className={`rounded-full block px-4 py-2 text-sm font-semibold ${order.isPaid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                                        <HiOutlineClock className="inline mr-1" />
                                                        Pending
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                <span className={`rounded-full  px-4 py-2 text-sm font-semibold ${order.isDelivered ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}>
                                                    <HiOutlineTruck className="inline mr-1" />
                                                    {order.isDelivered ? "Delivered" : "Processing"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Middle */}
                                    <div className="grid gap-6 lg:grid-cols-3 p-6">
                                        {/* Shipping */}
                                        <div>
                                            <h3 className="font-bold text-lg mb-3">
                                                Shipping Address
                                            </h3>
                                            <p>
                                                {order.shippingAddress.city}
                                            </p>
                                            <p>
                                                {order.shippingAddress.details}
                                            </p>
                                            <p>
                                                {order.shippingAddress.phone}
                                            </p>
                                        </div>
                                        {/* Payment */}
                                        <div>
                                            <h3 className="font-bold text-lg mb-3">
                                                Payment
                                            </h3>
                                            <p className="flex items-center gap-2">
                                                {order.paymentMethodType === "card" ? (
                                                    <>
                                                        <FaCreditCard />
                                                        Card
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaMoneyBillWave />
                                                        Cash
                                                    </>
                                                )}
                                            </p>
                                            <p className="mt-3">
                                                Products :
                                                <span className="font-bold ml-2">
                                                    {order.cartItems.length}
                                                </span>
                                            </p>
                                        </div>
                                        {/* Total */}
                                        <div className="text-left lg:text-right">
                                            <h3 className="font-bold text-lg mb-3">
                                                Total
                                            </h3>
                                            <h2 className="text-3xl font-bold text-green-600">
                                                {order.totalOrderPrice} EGP
                                            </h2>
                                        </div>
                                    </div>
                                    {/* Products */}
                                    <details>
                                        <summary className="flex cursor-pointer items-center justify-center gap-2 bg-gray-50 py-4 font-semibold hover:bg-gray-100">
                                            View Products
                                            <MdKeyboardArrowDown size={22} />
                                        </summary>
                                        <div className="divide-y">
                                            {order.cartItems.map((item) => (
                                                <div
                                                    key={item._id}
                                                    className="flex flex-col md:flex-row items-center justify-between p-5"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <Image
                                                            src={item.product.imageCover}
                                                            alt={item.product.title}
                                                            width={200}
                                                            height={200}
                                                            className="h-24 w-24 rounded-xl object-cover"
                                                        />
                                                        <div>
                                                            <h3 className="font-semibold">
                                                                {item.product.title}
                                                            </h3>
                                                            <p className="text-gray-500">
                                                                Qty : {item.count}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-xl font-bold text-green-600">
                                                        {item.price} EGP
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </details>
                                </div>
                            ))}
                        </div>
                    </>
                }
            </div>
        </div>
    );
}
