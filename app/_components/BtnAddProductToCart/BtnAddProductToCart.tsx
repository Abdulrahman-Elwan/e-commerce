'use client'
import addToCart from '@/CartActions/addToCart'
import { Button } from '@/components/ui/button'
import { CountOfCart } from '@/context/countOfCart'
import { useContext } from 'react'
import { toast } from 'sonner'

export function BtnAddProductToCart({ id }: { id: string }) {
    const { isCount, setIsCountOfCart } = useContext(CountOfCart)!;
    async function handelAddToCart(id: string) {
        const res = await addToCart(id);
        if (res.status === "success") {
            setIsCountOfCart(isCount + 1)
            toast.success('product added successfully 🛒', { position: 'top-center', duration: 3000 })
        } else {
            toast.error('You are not logged in. Please login to get access', { position: 'top-center', duration: 3000 })
        }
    }
    return (
        <Button onClick={() => handelAddToCart(id)} className='w-full text-[18px] font-semibold py-5 text-white bg-green-600 cursor-pointer hover:bg-green-800 hover:text-white transition-all duration-500' variant="outline">+ add to cart</Button>
    )
}
