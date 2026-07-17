import { Metadata } from "next";
import OrderPage from "./OrderPage";

export const metadata: Metadata = {
    title: "My Orders | FreshCart",
    description:
        "View your order history and track your previous purchases.",

    alternates: {
        canonical: "/allorders",
    },

    robots: {
        index: false,
        follow: false,
    },
};

export default function Page() {
    return (<OrderPage />)
}