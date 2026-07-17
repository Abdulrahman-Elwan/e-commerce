'use server'
import getMyToken from "@/utility/getMyToken"

export default async function addProductToWishlist(id: string) {
    try {
        const token = await getMyToken();
        if (!token) throw new Error('please login to be able see cart');
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
            method: 'POST',
            headers: {
                token: `${token}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "productId": id
            })
        });
        const payLoad = await res.json();
        return payLoad;
    } catch (err) {
        return err;
    }
}
