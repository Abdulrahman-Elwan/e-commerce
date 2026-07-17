"use server"
import getMyToken from '@/utility/getMyToken'

export default async function getUserOrders(id: string) {
    try{
        const token = await getMyToken()
        if (!token) throw new Error("Please login first. 🤷‍♂️");
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`, {
            method: 'GET'
        });
        const payLoad = await res.json()
        return payLoad;
    }catch(err){
        return err;
    }

}
