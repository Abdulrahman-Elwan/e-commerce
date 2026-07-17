import { Metadata } from "next";
import WishlistPage from "./WishlistPage";

export const metadata: Metadata = {
    title: "Wishlist | FreshCart",
    description:
        "View and manage your saved favorite products.",

    alternates: {
        canonical: "/wishlist",
    },

    robots: {
        index: false,
        follow: false,
    },
};

export default function page() {
    return(<WishlistPage/>)
}
