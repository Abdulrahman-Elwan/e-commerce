"use client"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import '../../../node_modules/swiper/swiper-bundle.min.css';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { categoryType } from '@/types/category.type';

export default function CategoriesSwiper({ data }: { data: categoryType[] }) {
    return (
        <div className='container md:w-[85%] mx-auto px-5 md:px-0'>
            <h2 className='text-xl md:text-3xl font-bold mb-2 text-green-900'>
                Shop Popular Categories
            </h2>
            <Swiper
                spaceBetween={10}
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
                {data.map((product: categoryType) => <SwiperSlide key={product._id}>
                    <div className='p-2.5'>
                        <div className="h-48">
                            <Image src={product.image} width={500} height={500} className='h-full w-full rounded-tl-3xl rounded-tr-3xl' alt={product.slug} />
                        </div>
                        <h4 className="text-center font-bold">
                            {product.name}
                        </h4>
                    </div>
                </SwiperSlide>)}
            </Swiper>
        </div>
    )
}
