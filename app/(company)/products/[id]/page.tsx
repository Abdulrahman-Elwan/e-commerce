
import specificProduct from '@/apis/specificProduct';
import Image from 'next/image';
import { BtnAddProductToCart } from '@/app/_components/BtnAddProductToCart/BtnAddProductToCart';
import getSpecificCategory from '@/app/_components/categoryAction/getRelatedProduct';
import RelatedProductSwiper from "@/app/_components/categoryAction/relatedProduct.slide";
import ReviewsSection from "@/app/_components/Reviews/ReviewsSection";
import getMyToken from "@/utility/getMyToken";
import { Metadata } from 'next';

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const product = await specificProduct(id);

    return {
        title: `${product.title} | FreshCart`,
        
        description:
            product.description.length > 160
                ? product.description.slice(0, 157) + "..."
                : product.description,

        keywords: [
            product.title,
            product.category.name,
            product.brand?.name ?? "",
            "FreshCart",
            "Online Shopping",
            "Egypt",
        ],

        alternates: {
            canonical: `/products/${id}`,
        },

        openGraph: {
            title: `${product.title} | FreshCart`,
            description: product.description,
            url: `/products/${id}`,
            siteName: "FreshCart",
            images: [
                {
                    url: product.imageCover,
                    width: 1200,
                    height: 630,
                    alt: product.title,
                },
            ],
            type: "website",
        },

        twitter: {
            card: "summary_large_image",
            title: `${product.title} | FreshCart`,
            description: product.description,
            images: [product.imageCover],
        },
    };
}

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
    const token = await getMyToken();
    const { id } = await params;
    const data = await specificProduct(id);
    const res = await getSpecificCategory(data.category._id);

    return (
        <div className='container md:w-[85%] mx-auto my-3.5 px-3 pb-10'>
            <div className="p-4 px-0 md:flex items-center md:gap-3">
                <div className="md:w-1/3 w-full">
                    <Image src={data.imageCover} className='object-fill' alt={data.title} width={500} height={500} />
                </div>
                <div className="md:w2/3 w-full">
                    <div className="p-2.5">
                        <h1 className='text-3xl font-bold'>
                            {data.title}
                        </h1>
                        <p className="my-3 text-xl font-semibold text-gray-400">
                            {data.description}
                        </p>
                        <p className="text-xl font-bold">
                            {data.category.name}
                        </p>
                        <div className='my-3 bg-transparent flex justify-between items-center text-xl font-semibold'>
                            <span className='text-2xl'>
                                {data.price} EGP
                            </span>
                            <span>
                                {data.ratingsAverage} <i className="fa-solid fa-star text-yellow-400"></i>
                            </span>
                        </div>
                        <BtnAddProductToCart id={id} />
                    </div>
                </div>
            </div>
            <RelatedProductSwiper data={res.data} />
            <ReviewsSection productId={id}  token={token!}/>
        </div>
    )
}
