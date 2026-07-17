import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from '@/app/_components/navbar/page';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import MySessionProvider from './MySessionProvider/MySessionProvider'
import CountOfCartProvider from '@/context/countOfCart'
import CountOfWishlistProvider from "@/context/countOfWishlist";
import Footer from "./_components/footer/footer";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_URL!),

  title: {
    default: "FreshCart",
    template: "%s | FreshCart",
  },

  description:
    "FreshCart is an online shopping platform offering groceries, fashion, electronics, and more.",

  icons: {
    icon: "../public/freshcart-logo.svg",
  },

  keywords: [
    "FreshCart",
    "Shopping",
    "Ecommerce",
    "Online Store",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    siteName: "FreshCart",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <MySessionProvider >
          <CountOfCartProvider>
            <CountOfWishlistProvider>
              <header>
                <NavBar />
              </header>
              {children}
              <Footer />
            </CountOfWishlistProvider>
          </CountOfCartProvider>
        </MySessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
