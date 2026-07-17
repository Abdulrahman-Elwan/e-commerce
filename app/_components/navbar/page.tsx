'use client'
import Image from 'next/image';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext, useEffect, useRef, useState } from 'react'
import logoImage from '../../../public/freshcart-logo.svg'
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { CountOfCart } from '@/context/countOfCart';
import { Navbar, Dropdown, NavbarBrand, NavbarCollapse, DropdownItem, DropdownDivider, DropdownHeader, } from "flowbite-react";
import { FaHeart, FaShoppingCart, FaUserCircle, } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { HiOutlineBars3 } from "react-icons/hi2";
import { CountOfWishlist } from '@/context/countOfWishlist';


export default function NavBar() {
    const { isCount } = useContext(CountOfCart)!;
    const { isCountOfWishlist} = useContext(CountOfWishlist)!;
    const { data: session } = useSession()
    const path = usePathname();
    const topBarRef = useRef<HTMLDivElement>(null);
    const [isSticky, setIsSticky] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    function handelSignOut() {
        signOut({ callbackUrl: '/login' })
    }

    useEffect(() => {
        const handleScroll = () => {
            const height = topBarRef.current?.offsetHeight || 0;

            setIsSticky(window.scrollY >= height);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div>
            {/* top NavBar */}
            <div ref={topBarRef} className="block w-full py-2 bg-green-950">
                <div className="flex items-center container w-full px-1.5 md:px-0 md:w-[85%] mx-auto justify-between text-white gap-2.5">
                    <div className="adsBar w-2/3 overflow-hidden relative">
                        <div className="whitespace-nowrap animate-marquee ">
                            🎉 Free Shipping on orders over $100 &nbsp;&nbsp;&nbsp;&nbsp;
                            | &nbsp;&nbsp;&nbsp;&nbsp;
                            🔥 Up to 70% OFF on selected products &nbsp;&nbsp;&nbsp;&nbsp;
                            | &nbsp;&nbsp;&nbsp;&nbsp;
                            🚚 Fast Delivery within 24 Hours
                        </div>
                    </div>
                    <div className="social">
                        <ul className='flex gap-2 text-[12px] items-center'>
                            <li><i className="fa-brands fa-instagram"></i></li>
                            <li><i className="fa-brands fa-facebook-f"></i></li>
                            <li><i className="fa-brands fa-tiktok"></i></li>
                            <li><i className="fa-brands fa-x-twitter"></i></li>
                            <li><i className="fa-brands fa-linkedin-in"></i></li>
                            <li><i className="fa-brands fa-youtube"></i></li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* main NavBar */}
            <div className={`w-full transition-all duration-300 ${isSticky ? "fixed top-0 left-0 z-50 bg-white shadow-xl" : "relative"}`}>
                <div className="relative py-3 bg-white shadow-md">
                    <Navbar fluid rounded className="container w-full md:w-[85%] mx-auto">
                        {/* Logo + Links */}
                        <div className="flex items-center gap-10">
                            <NavbarBrand href="/">
                                <Image src={logoImage} alt="Main Logo" />
                            </NavbarBrand>

                            {/* Desktop Links */}
                            <NavbarCollapse className="hidden md:flex">
                                <Link href="/" className={path === "/" ? "active font-semibold text-[18px]" : "font-semibold text-[18px]"}>
                                    Home
                                </Link>
                                <Link href="/products" className={path === "/products" ? "active font-semibold text-[18px]" : "font-semibold text-[18px]"}>
                                    Products
                                </Link>
                                <Link href="/categories" className={path === "/categories" ? "active font-semibold text-[18px]" : "font-semibold text-[18px]"}>
                                    Categories
                                </Link>
                                <Link href="/brands" className={path === "/brands" ? "active font-semibold text-[18px]" : "font-semibold text-[18px]"}>
                                    Brands
                                </Link>
                            </NavbarCollapse>
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center gap-4 md:order-2">
                            {!session ? (
                                <>
                                    <Link href="/login" className="text-[18px] font-semibold hover:text-green-950 cursor-pointer transition-colors duration-500 ease-in-out">
                                        Login
                                    </Link>
                                    <Link href="/register">
                                        <Button className="text-[18px] bg-green-950 hover:bg-green-800 cursor-pointer transition-colors duration-500 ease-in-out">
                                            Register
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    {/* Wishlist */}
                                    <Link href="/wishlist" className="relative hidden md:block text-2xl hover:text-red-600 transition">
                                        <FaHeart className={isCountOfWishlist > 0 ? 'text-red-600' : ''}/>
                                        {isCountOfWishlist > 0 && (
                                            <span className="absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                                                {isCountOfWishlist}
                                            </span>
                                        )}
                                    </Link>
                                    {/* Cart */}
                                    <Link href="/cart" className="relative text-2xl hover:text-green-600 transition" >
                                        <FaShoppingCart className={isCount > 0 ? 'text-green-600' : ''} />
                                        {isCount > 0 && (
                                            <span className="absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                                                {isCount}
                                            </span>
                                        )}
                                    </Link>
                                    {/* User Dropdown */}
                                    <Dropdown arrowIcon={false} inline
                                        label={
                                            <div className="flex items-center gap-2 cursor-pointer">
                                                <FaUserCircle className="text-3xl text-green-950" />
                                                <span className="hidden lg:block font-semibold">
                                                    {session.user?.name}
                                                </span>
                                            </div>
                                        } >
                                        <DropdownHeader>
                                            <span className="block text-[17px] font-semibold">
                                                {session.user?.name}
                                            </span>
                                            <span className="block truncate text-sm font-medium text-gray-700">
                                                {session.user?.email}
                                            </span>
                                        </DropdownHeader>

                                        <DropdownItem>
                                            <Link href="/profile" className='text-[15px] font-semibold'>My Profile</Link>
                                        </DropdownItem>

                                        <DropdownItem>
                                            <Link href="/allorders" className='text-[15px] font-semibold'>My Orders</Link>
                                        </DropdownItem>

                                        <DropdownItem>
                                            <Link href="/wishlist" className='text-[15px] font-semibold'>Wishlist</Link>
                                        </DropdownItem>

                                        <DropdownDivider />

                                        <DropdownItem className="text-white text-[15px] block my-1 font-semibold rounded-2xl mx-auto text-center bg-green-950 hover:text-green-800 transition-colors duration-500 ease-in-out w-[93%]" onClick={handelSignOut}>
                                            Logout
                                        </DropdownItem>
                                    </Dropdown>
                                </>
                            )}

                            {/* Mobile Toggle */}
                            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-3xl">
                                {isOpen ? <IoClose /> : <HiOutlineBars3 />}
                            </button>
                        </div>

                        {/* Mobile Menu */}
                        <div className={`fixed ${isSticky ? "top-18.75" : "top-28.75"} left-0 w-full h-[calc(100vh-72px)] bg-black/40 z-50 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                            <div className={` flex flex-col gap-3 bg-white shadow-xl px-3.5 pb-5 rounded-b-xl transform transition-all duration-500 ease-out ${isOpen ? "translate-y-0 opacity-100 scale-100" : "-translate-y-8 opacity-0 scale-95"} `}>
                                <Link href="/" className="py-2">
                                    Home
                                </Link>
                                <Link href="/products" className="py-2">
                                    Products
                                </Link>
                                <Link href="/categories" className="py-2">
                                    Categories
                                </Link>
                                <Link href="/brands" className="py-2">
                                    Brands
                                </Link>
                            </div>
                        </div>
                    </Navbar>
                </div>
            </div>
        </div>
    )
}
