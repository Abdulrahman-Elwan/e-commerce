import BrandCart from '@/app/_components/brandCart/brandCart'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Brands | FreshCart",
    description: "Browse all brands available at FreshCart. Find your favorite brands at the best prices.",
    openGraph: {
        title: "Brands | FreshCart",
        description:
            "Explore all available brands on FreshCart.",
        url: "/brands",
        siteName: "FreshCart",
        images: [
            {
                url: "/freshcart-logo.svg",
                width: 1200,
                height: 630,
            },
        ],
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Brands | FreshCart",
        description:
            "Explore all available brands on FreshCart.",
        images: ["/og-image.png"],
    },

    alternates: {
        canonical: "/brands",
    },
};

export default function Brands() {
    return (
        <div className='container md:w-[85%] mx-auto'>
            <BrandCart />
        </div>
    )
}
