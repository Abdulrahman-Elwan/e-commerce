'use client'
import { Button } from '@/components/ui/button'
import { CountOfWishlist } from '@/context/countOfWishlist'
import addProductToWishlist from '@/wishlistAction/addProductToWishlist'
import removeProductFromWishlist from '@/wishlistAction/removeProductFromWishlist'
import { useContext } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { toast } from 'sonner'


export function BtnAddProductToWishlist({ id }: { id: string }) {
    const { isCountOfWishlist, setIsCountOfWishlist, isIds, setIsIds } = useContext(CountOfWishlist)!;
    const isInWishlist = isIds.some((productID: string) => productID === id)

    async function handelAddToWishlist(id: string) {
        const res = await addProductToWishlist(id);
        if (res.status === "success") {
            setIsIds(res.data);
            setIsCountOfWishlist(isCountOfWishlist + 1);
            toast.success('product added successfully ❤️', { position: 'top-center', duration: 3000 });
        } else {
            toast.error('You are not logged in. Please login to get access', { position: 'top-center', duration: 3000 });
        }
    }

    async function handelDeleteToWishlist(id: string) {
        const res = await removeProductFromWishlist(id);
        if (res.status === "success") {
            setIsIds(res.data);
            setIsCountOfWishlist(isCountOfWishlist - 1);
            toast.success(`${res.message}`, { position: 'top-center', duration: 3000 });
        } else {
            toast.error(`${res.message}`, { position: 'top-center', duration: 3000 });
        }
    }

    return (
        <div>
            {isInWishlist ? (
                <Button className="w-full border-0 bg-transparent block text-4xl p-0 font-semibold text-green-900 cursor-pointer hover:text-green-800 hover:bg-transparent transition-all duration-500"
                    variant="outline"
                    onClick={() => handelDeleteToWishlist(id)} >
                    <FaHeart className="size-6 mx-auto text-red-600" />
                </Button>
            ) : (
                <Button className="w-full border-0 bg-transparent block text-4xl p-0 font-semibold text-green-900 cursor-pointer hover:text-green-800 hover:bg-transparent transition-all duration-500"
                    variant="outline"
                    onClick={() => handelAddToWishlist(id)} >
                    <FaRegHeart className="size-6 mx-auto" />
                </Button>
            )}
        </div>
    )
}
