import { Metadata } from "next";
import LoginPage from "./LoginPage";

export const metadata: Metadata = {
    title: "Login | FreshCart",
    description:
        "Sign in to your FreshCart account to continue shopping.",

    alternates: {
        canonical: "/login",
    },

    robots: {
        index: false,
        follow: false,
    },
};

export default function LogIn() {
    return(<LoginPage/>)
}
