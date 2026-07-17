'use client'

import getLoggedUserCart from "@/CartActions/getLoggedUserCart";
import {
    createContext,
    useEffect,
    useState,
    Dispatch,
    SetStateAction,
    ReactNode,
} from "react";

interface CountOfCartContextType {
    isCount: number;
    setIsCountOfCart: Dispatch<SetStateAction<number>>;
}

interface CountOfCartProviderProps {
    children: ReactNode;
}

export const CountOfCart = createContext<CountOfCartContextType | null>(null);

export default function CountOfCartProvider({children,}: CountOfCartProviderProps) {
    const [isCount, setIsCountOfCart] = useState<number>(0);

    const LoggedUserCart = async () => {
        try {
            const res = await getLoggedUserCart();
            if (res.status === "success") {
                let sum = 0;
                res.data.products.forEach((product: { count: number }) => {
                    sum += product.count;
                });
                setIsCountOfCart(sum);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        LoggedUserCart();
    }, []);

    return (
        <CountOfCart.Provider value={{ isCount, setIsCountOfCart }}>
            {children}
        </CountOfCart.Provider>
    );
}