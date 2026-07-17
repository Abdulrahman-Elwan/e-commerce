'use client'

import { ProductType } from "@/types/product.type";
import getUserWishlist from "@/wishlistAction/getUserWishlist";
import {
    createContext,
    useEffect,
    useState,
    Dispatch,
    SetStateAction,
    ReactNode,
} from "react";

interface CountOfWishlistContextType {
    isCountOfWishlist: number;
    setIsCountOfWishlist: Dispatch<SetStateAction<number>>;
    isIds: string[];
    setIsIds: Dispatch<SetStateAction<string[]>>;
}

interface CountOfWishlistProviderProps {
    children: ReactNode;
}

export const CountOfWishlist = createContext<CountOfWishlistContextType | null>(null);

export default function CountOfWishlistProvider({children,}: CountOfWishlistProviderProps) {
    const [isCountOfWishlist, setIsCountOfWishlist] = useState<number>(0);
    const [isIds, setIsIds] = useState<string[]>([]);

    const LoggedUserWishlist = async () => {
        try {
            const res = await getUserWishlist();
            if (res.status === "success") {
                setIsIds(res.data.map((product:ProductType)=> product.id));
                setIsCountOfWishlist(res.count);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        LoggedUserWishlist();
    }, []);

    return (
        <CountOfWishlist.Provider value={{ isCountOfWishlist, setIsCountOfWishlist, isIds, setIsIds }}>
            {children}
        </CountOfWishlist.Provider>
    );
}