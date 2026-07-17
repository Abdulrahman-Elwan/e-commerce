import Filter from '@/app/_components/filter/filter';
import ProductsContainer from '@/app/_components/productsContainer/ProductsContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Products | FreshCart",
    description:
        "Browse all products available at FreshCart. Shop groceries, electronics, fashion, beauty products, home essentials, and more with the best prices and fast delivery.",

    keywords: [
        "FreshCart",
        "Products",
        "Online Shopping",
        "Groceries",
        "Electronics",
        "Fashion",
        "Beauty",
        "Home",
        "Best Prices",
        "Egypt",
    ],

    openGraph: {
        title: "Products | FreshCart",
        description:
            "Explore thousands of products on FreshCart with exclusive offers and fast delivery.",
        url: "/products",
        siteName: "FreshCart",
        images: [
            {
                url: "/freshcart-logo.svg",
                width: 1200,
                height: 630,
                alt: "FreshCart Products",
            },
        ],
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Products | FreshCart",
        description:
            "Browse thousands of products at FreshCart with the best prices.",
        images: ["/freshcart-logo.svg"],
    },

    alternates: {
        canonical: "/products",
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default async function Products({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>; }) {
    const params = await searchParams;
    const queryString = new URLSearchParams(
        Object.entries(params).flatMap(([key, value]) =>
            Array.isArray(value)
                ? value.map((v) => [key, v])
                : value
                    ? [[key, value]]
                    : []
        )
    ).toString();

    return <>
        <div className="flex flex-col md:flex-row gap-5 w-full px-0 pb-10 md:w-[90%] mx-auto mt-10 justify-center items-center md:justify-between md:items-baseline">
            <div className="filter w-[95%] px-3 md:px-0 md:w-1/4">
                <Filter />
            </div>
            <div className="max-w-[95%] md:w-3/4 px-1 md:px-0">
                <div className="rounded-2xl border border-gray-200 py-5 max-w-full bg-white shadow-xl">
                    <ProductsContainer queryString={queryString} />
                </div>
            </div>
        </div>
    </>
}
