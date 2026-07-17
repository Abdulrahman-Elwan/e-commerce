"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import img1 from "../../../public/slider-image-1.jpeg";
import img2 from "../../../public/slider-image-2.jpeg";
import img3 from "../../../public/slider-image-3.jpeg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import {
    FaShippingFast,
    FaLock,
    FaHeadset,
    FaUndoAlt,
} from "react-icons/fa";

export default function MainBanner() {
    const slides = [
        {
            image: img1,
            title: "New Season Collection",
            desc: "Discover premium products with exclusive offers up to 50% OFF.",
        },
        {
            image: img2,
            title: "Everything You Need",
            desc: "Shop thousands of products with secure payment and fast delivery.",
        },
        {
            image: img3,
            title: "Best Deals Everyday",
            desc: "Save more on your favorite brands and enjoy amazing discounts.",
        },
    ];

    const features = [
        {
            icon: <FaShippingFast />,
            title: "Free Shipping",
            text: "On orders over $100",
        },
        {
            icon: <FaLock />,
            title: "Secure Payment",
            text: "100% Protected Checkout",
        },
        {
            icon: <FaUndoAlt />,
            title: "Easy Returns",
            text: "30 Days Return Policy",
        },
        {
            icon: <FaHeadset />,
            title: "24/7 Support",
            text: "Always here for you",
        },
    ];

    return (
        <section className=" mb-14">

            {/* Hero */}
            <div className="overflow-hidden shadow-2xl">

                <Swiper
                    modules={[Autoplay, Pagination]}
                    slidesPerView={1}
                    loop
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative h-[calc(100vh-120px)] sm:h-95 lg:h-[calc(100vh-120px)]">

                                <Image src={slide.image}alt={slide.title} fill priority={index === 0} className="object-cover"/>

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/30" />
                                {/* Content */}
                                <div className="absolute inset-0 flex items-center">
                                    <div className="max-w-xl px-6 md:px-12 text-white">
                                        <span className="inline-block bg-green-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                                            Exclusive Offer
                                        </span>

                                        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5">
                                            {slide.title}
                                        </h1>

                                        <p className="text-gray-200 text-sm md:text-lg leading-7 mb-8">
                                            {slide.desc}
                                        </p>

                                        <div className="flex flex-wrap gap-4">

                                            <Link href="/products" className="bg-green-600 hover:bg-green-700 transition px-7 py-3 rounded-xl font-semibold">
                                                Shop Now
                                            </Link>

                                            <Link href="/categories" className="border border-white hover:bg-white hover:text-black transition px-7 py-3 rounded-xl font-semibold">
                                                Explore
                                            </Link>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>

            {/* Features */}
            <div className="container w-[85%] mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
                    {features.map((item, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col md:flex-row items-center gap-4 group">
                            
                            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-2xl group-hover:scale-110 transition">
                                {item.icon}
                            </div>

                            <div className="text-center md:text-start">
                                <h3 className="font-bold text-gray-800">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {item.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}