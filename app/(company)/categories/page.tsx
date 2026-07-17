import CategoriesCard from '@/app/_components/categoriesCard/page'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Categories | FreshCart",
    description:
        "Browse all product categories on FreshCart. Discover groceries, electronics, fashion, home essentials, and more at the best prices.",

    keywords: [
        "FreshCart Categories",
        "Shopping Categories",
        "Online Shopping",
        "Groceries",
        "Electronics",
        "Fashion",
        "Home",
        "FreshCart Egypt",
    ],

    openGraph: {
        title: "Categories | FreshCart",
        description:
            "Explore all product categories available on FreshCart and shop with ease.",
        url: "/categories",
        siteName: "FreshCart",
        images: [
            {
                url: "/freshcart-logo.svg",
                width: 1200,
                height: 630,
                alt: "FreshCart Categories",
            },
        ],
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Categories | FreshCart",
        description:
            "Explore all product categories available on FreshCart.",
        images: ["/freshcart-logo.svg"],
    },

    alternates: {
        canonical: "/categories",
    },
};

export default function Categories() {
    return (
        <div className='container md:w-[85%] mx-auto px-3'>
            <CategoriesCard />
        </div>
    )
}
