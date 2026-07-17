"use client";

import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import getUserAddress from "@/apis/getUserAddress";
import { userAddress } from "@/types/addresses.type";
import deleteUserAddress from "@/apis/deleteUserAddress";
import { Spinner } from "@/components/ui/spinner";

export default function UserAddressesCard() {
    const [userAddresses, setUserAddresses] = useState<userAddress[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUserAddress = async () => {
        setLoading(true)
        const res = await getUserAddress();
        if (res.status === "success") {
            setUserAddresses(res.data);
        }
        setLoading(false)
    }

    async function handleDelete(id: string) {
        const res = await deleteUserAddress(id);
        if (res.status === "success") {
            setUserAddresses(res.data);
        }
    }

    useEffect(() => {
        fetchUserAddress();
    }, [])

    return (
        <div className="space-y-5 px-2 pb-3">
            {loading ?
                <div className="py-16 text-center rounded-2xl border border-dashed border-gray-300 flex justify-center items-center">
                    <Spinner />
                </div> : <>
                    {userAddresses.length > 0 ? (
                        userAddresses.map((address) => (
                            <div key={address._id} className="rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 p-5">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="space-y-3 flex-1">
                                        <h2 className="text-xl font-bold text-green-900">
                                            {address.name}
                                        </h2>
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <FaMapMarkerAlt className="text-green-700" />
                                            <span className="font-medium">
                                                {address.city}
                                            </span>
                                        </div>
                                        <div className="text-gray-600 whitespace-pre-line leading-7">
                                            {address.details}
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <FaPhoneAlt className="text-green-700" />
                                            <span>{address.phone}</span>
                                        </div>
                                    </div>

                                    <Button variant="destructive" size="icon" className="cursor-pointer" onClick={() => handleDelete(address._id)}>
                                        <FaTrash />
                                    </Button>

                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-16 text-center rounded-2xl border border-dashed border-gray-300">
                            <div className="text-6xl mb-4">📍</div>
                            <h3 className="text-2xl font-bold text-gray-700">
                                No Addresses Found
                            </h3>
                            <p className="text-gray-500 mt-2">
                                Add your first shipping address.
                            </p>
                        </div>
                    )}
                </>}
        </div>
    );
}