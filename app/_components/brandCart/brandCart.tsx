'use client'

import getAllBrands from '@/apis/getAllBrands'
import { brandType } from '@/types/brand.type'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function BrandCart() {
    const [brands, setBrands] = useState<brandType[]>([])

    const getBrands = async () => {
        const res = await getAllBrands()
        setBrands(res)
    }

    useEffect(() => {
        getBrands()
    }, [])

    // تقسيم البراندات حسب أول حرف
    const groupedBrands = useMemo(() => {
        const grouped: Record<string, brandType[]> = {}
        brands.forEach((brand) => {
            const letter = brand.name.charAt(0).toUpperCase()
            if (!grouped[letter]) {
                grouped[letter] = []
            }
            grouped[letter].push(brand)
        })

        return Object.keys(grouped).sort().reduce((obj, key) => {
            obj[key] = grouped[key].sort((a, b) =>
                a.name.localeCompare(b.name)
            )
            return obj
        }, {} as Record<string, brandType[]>)
    }, [brands])

    return (
        <section className="container mx-auto px-4 py-10">
            {/* Header */}
            <div className="text-center mb-14">
                <h1 className="text-4xl md:text-5xl font-bold text-green-900">
                    Our Brands
                </h1>
                <p className="text-gray-500 mt-4 text-lg">
                    Discover products from the world`&apos;`s most trusted brands.
                </p>
            </div>

            {Object.entries(groupedBrands).map(([letter, items]) => (
                <div key={letter} className="mb-12">
                    {/* Letter */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-full bg-green-700 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                            {letter}
                        </div>
                        <div className="flex-1 h-0.5 bg-gray-200"></div>
                    </div>

                    {/* Brands */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {items.map((brand) => (
                            <Link key={brand._id} href={`/products?brand=${brand._id}`}>
                                <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                                    <div className="flex items-center justify-center h-28">
                                        <Image src={brand.image} alt={brand.name} width={160} height={80} className="object-contain max-h-20 w-auto transition-transform duration-300 group-hover:scale-110" />
                                    </div>

                                    <div className="mt-6 text-center">
                                        <h2 className="font-bold text-lg text-gray-800 line-clamp-1">
                                            {brand.name}
                                        </h2>

                                        <div className=" mt-4 flex items-center justify-center gap-2 text-green-600 font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 ">
                                            Explore
                                            <ArrowRight size={18} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    )
}