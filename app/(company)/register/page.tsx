import { Metadata } from "next";
import RegisterPage from "./RegisterPage";

export const metadata: Metadata = {
    title: "Create Account | FreshCart",
    description:
        "Create a new FreshCart account and start shopping online.",

    alternates: {
        canonical: "/register",
    },

    robots: {
        index: false,
        follow: false,
    },
};

export default function Page() {
    return(<RegisterPage />)
}
