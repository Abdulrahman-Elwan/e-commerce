'use server'
import getMyToken from "@/utility/getMyToken"

export default async function getUserWishlist() {
    try{
        const token = await getMyToken();
        if(!token) throw new Error('please login first');
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist',{
            method: 'GET',
            headers: {
                token,
                "Content-type": "application/json" 
            }
        });
        const payLoad = await res.json();
        return payLoad;
    }catch(err){
        return err;
    }
}
