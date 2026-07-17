"use client"
import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import '../../../node_modules/swiper/swiper-bundle.min.css';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { ProductType } from '@/types/product.type';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BtnAddProductToCart } from '../BtnAddProductToCart/BtnAddProductToCart';

export default function RelatedProductSwiper({ data }: { data: ProductType[] }) {
    return (
        <div className='container md:w-full mx-auto px-0 md:px-0'>
            <h2 className='mt-10 text-2xl md:text-5xl font-semibold text-green-800'>
                Related Product :
            </h2>
            <Swiper
                spaceBetween={0}
                modules={[Autoplay]}
                autoplay={{ delay: 2000 }}
                breakpoints={{
                    0: {
                        slidesPerView: 2,
                    },
                    480: {
                        slidesPerView: 3,
                    },
                    640: {
                        slidesPerView: 4,
                    },
                    768: {
                        slidesPerView: 5,
                    },
                    1024: {
                        slidesPerView: 6,
                    },
                    1280: {
                        slidesPerView: 8,
                    },
                }}
            >
                {data.map((product: ProductType) => <SwiperSlide key={product._id} className='py-5 px-2.5'>
                    <div>
                        <Card>
                            <Link href={`/products/${product.id}`}>
                                <CardHeader>
                                    <CardTitle>
                                        <Image src={product.imageCover} alt={product.title} width={500} height={500} />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className='text-green-500 font-medium text-[17px]'>{product.category.name}</p>
                                    <h3 className='text-[22px] font-semibold line-clamp-1'>{product.title}</h3>
                                    <div className="bg-transparent flex justify-between items-center text-[16px] font-semibold mt-1.5">
                                        <span>
                                            {product.price} EGP
                                        </span>
                                        <span>
                                            {product.ratingsAverage} <i className="fa-solid fa-star text-yellow-400"></i>
                                        </span>
                                    </div>
                                </CardContent>

                            </Link>
                            <CardFooter className='bg-transparent items-center text-[16px] font-semibold p-1 mt-0'>
                                <BtnAddProductToCart id={product.id} />
                            </CardFooter>
                        </Card>
                    </div>
                </SwiperSlide>)}
            </Swiper>
        </div>
    )
}
