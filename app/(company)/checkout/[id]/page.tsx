import { Metadata } from "next";
import CheckoutPage from "./CheckoutPage";

export const metadata: Metadata = {
    title: "Checkout | FreshCart",
    description:
        "Complete your order securely with FreshCart checkout.",

    alternates: {
        canonical: "/checkout",
    },

    robots: {
        index: false,
        follow: false,
    },
};

export default function checkout() {
    return(<CheckoutPage/>)
}
