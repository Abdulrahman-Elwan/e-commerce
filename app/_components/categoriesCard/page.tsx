'use client'

import getAllCategories from "@/apis/getAllCategories";
import { categoryType } from "@/types/category.type";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function CategoriesCard() {

    const [categories, setCategories] = useState<categoryType[]>([]);
    const [load, setLoad] = useState<boolean>(true);

    const getCategories = async () => {
        const res = await getAllCategories();
        setCategories(res);
        setLoad(false);
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <section className="container mx-auto py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-green-900">
                    Shop by Category
                </h1>
                <p className="text-gray-500 mt-3">
                    Discover products organized by category.
                </p>
            </div>

            {load ?
                <div className="h-75 flex items-center justify-center">
                    <Spinner className="size-8" />
                </div>
                :
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {categories.map((category) => (
                        <Link href={`/products?category=${category._id}`} key={category._id} >
                            <div className=" group overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 border ">
                                <div className="overflow-hidden">
                                    <Image src={category.image} alt={category.name} width={500} height={350} className=" h-64 w-full object-cover transition duration-500 group-hover:scale-110 " />
                                </div>

                                <div className="p-5">
                                    <h2 className="text-2xl font-bold text-green-900">
                                        {category.name}
                                    </h2>
                                    <div className="mt-5 flex items-center text-green-600 font-semibold gap-2 group-hover:gap-4 transition-all ">
                                        Explore
                                        <ArrowRight size={18} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            }
        </section>
    );
}