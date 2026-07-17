
import { Metadata } from "next";
import CartPage from "./CartPage";

export const metadata: Metadata = {
    title: "Shopping Cart | FreshCart",
    description:
        "View and manage the products in your shopping cart before checkout.",

    alternates: {
        canonical: "/cart",
    },

    robots: {
        index: false,
        follow: false,
    },
};

export default function Cart() {
    return(<CartPage/>)
}
