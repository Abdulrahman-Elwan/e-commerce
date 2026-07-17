import Link from "next/link";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTwitter,
    FaYoutube,
} from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";

export default function Footer() {
    return (
        <footer className="bg-green-950 text-white">
            {/* Top */}
            <div className="container w-[85%] mx-auto py-14">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {/* Logo */}
                    <div>
                        <h2 className="text-3xl font-bold text-green-400">
                            FreshCart
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-gray-300">
                            Fresh groceries delivered to your doorstep with the best
                            quality and the fastest delivery.
                        </p>

                        <div className="mt-6 flex gap-3">
                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-green-600"
                            >
                                <FaFacebookF />
                            </a>

                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-green-600"
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-green-600"
                            >
                                <IoLogoTiktok />
                            </a>

                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-green-600"
                            >
                                <FaTwitter />
                            </a>

                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-green-600"
                            >
                                <FaLinkedinIn />
                            </a>

                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-green-600"
                            >
                                <FaYoutube />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-5 text-xl font-semibold">
                            Quick Links
                        </h3>

                        <ul className="space-y-3 text-gray-300">
                            <li>
                                <Link href="/" className="transition hover:text-green-400">
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/products"
                                    className="transition hover:text-green-400"
                                >
                                    Products
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/categories"
                                    className="transition hover:text-green-400"
                                >
                                    Categories
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/brands"
                                    className="transition hover:text-green-400"
                                >
                                    Brands
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="mb-5 text-xl font-semibold">
                            Customer Service
                        </h3>

                        <ul className="space-y-3 text-gray-300">
                            <li>
                                <Link href="#" className="transition hover:text-green-400">
                                    Contact Us
                                </Link>
                            </li>

                            <li>
                                <Link href="#" className="transition hover:text-green-400">
                                    FAQs
                                </Link>
                            </li>

                            <li>
                                <Link href="#" className="transition hover:text-green-400">
                                    Privacy Policy
                                </Link>
                            </li>

                            <li>
                                <Link href="#" className="transition hover:text-green-400">
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="mb-5 text-xl font-semibold">
                            Newsletter
                        </h3>

                        <p className="mb-4 text-sm text-gray-300">
                            Subscribe to receive updates about new products and offers.
                        </p>

                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full rounded-l-xl border-0 px-4 py-3 text-white outline-none"
                            />

                            <button className="rounded-r-xl bg-green-600 px-6 font-semibold transition hover:bg-green-500">
                                Join
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-white/10">
                <div className="container w-[85%] mx-auto flex flex-col items-center justify-between gap-3 py-5 text-sm text-gray-400 md:flex-row">
                    <p>
                        © {new Date().getFullYear()} FreshCart. All Rights Reserved.
                    </p>
                    <div className="flex gap-5">
                        <span>Visa</span>
                        <span>MasterCard</span>
                        <span>PayPal</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}