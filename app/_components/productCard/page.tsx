import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'
import { ProductType } from '@/types/product.type'
import { BtnAddProductToCart } from '../BtnAddProductToCart/BtnAddProductToCart'
import { BtnAddProductToWishlist } from '../BtnAddWishlistToCart/BtnAddWishlistToCart'

export default function ProductCard({ singleProduct }: { singleProduct: ProductType }) {
    
    return (
        <div className="productCard p-2">
            <Card>
                <Link href={`/products/${singleProduct.id}`}>
                    <CardHeader>
                        <CardTitle>
                            <Image src={singleProduct.imageCover} alt={singleProduct.title} width={500} height={500} />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="mt-2.5">
                        <p className='text-green-500 font-medium text-[15px]'>{singleProduct.category?.name}</p>
                        <h3 className='text-[22px] font-semibold line-clamp-1'>{singleProduct.title}</h3>
                        <div className="bg-transparent flex justify-between items-center text-[16px] font-semibold mt-1.5">
                            <span>
                                {singleProduct.price} EGP
                            </span>
                            <span>
                                {singleProduct.ratingsAverage} <i className="fa-solid fa-star text-yellow-400"></i>
                            </span>
                        </div>
                    </CardContent>

                </Link>
                <CardFooter className='bg-transparent flex items-center gap-1 text-[16px] font-semibold p-1 mt-0'>
                    <div className="w-4/5">
                        <BtnAddProductToCart id={singleProduct.id} />
                    </div>
                    <div className="w-1/5">
                        <BtnAddProductToWishlist id={singleProduct.id} />
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
