
import { Metadata } from "next";
import ProfilePage from "./ProfilePage";

export const metadata: Metadata = {
    title: "My Profile | FreshCart",
    description:
        "Manage your personal information and account settings.",

    alternates: {
        canonical: "/profile",
    },

    robots: {
        index: false,
        follow: false,
    },
};

export default function Page() {
    return(<ProfilePage/>)
}