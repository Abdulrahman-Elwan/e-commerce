'use client'

import ProductCard from '@/app/_components/productCard/page';
import { Spinner } from '@/components/ui/spinner';
import { ProductType } from '@/types/product.type';
import getUserWishlist from '@/wishlistAction/getUserWishlist'
import { useEffect, useState } from 'react'

export default function WishlistPage() {
    const [productsInWishlist, setProductsInWishlist] = useState<ProductType[]>([]);
    const [load, setLoad] = useState<boolean>(true);
    const fetchWishlist = async () => {
        try {
            const res = await getUserWishlist();

            if (res.data) {
                setProductsInWishlist(res.data);
            }
        } finally {
            setLoad(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    return (
        <div className='container w-[85%] mx-auto pb-10'>
            <div className="py-5 mt-7">
                <h1 className='text-2xl md:text-5xl font-bold text-green-950'>
                    MY Wishlist ❤️
                </h1>
            </div>
            <div className="wishlist">
                {load ?
                    <div className="h-75 flex items-center justify-center">
                        <Spinner className="size-8" />
                    </div>
                    :
                    <>
                        {productsInWishlist.length > 0 ?
                            <div className="flex flex-wrap">
                                {productsInWishlist.map((product: ProductType) =>
                                    <div key={product.id} className='w-1/2 md:w-1/3 xl:w-1/5'>
                                        <ProductCard singleProduct={product} />
                                    </div>)
                                }
                            </div>
                            :
                            <div>
                                <h2 className='text-2xl text-center w-full text-yellow-500 mt-8'>wishlist is empty!!</h2>
                            </div>
                        }
                    </>
                }
            </div>
        </div>
    )
}
