'use server'
import getMyToken from '@/utility/getMyToken';

export default async function applyCoupon(couponValue: { couponName: string }) {
    try {
        const token = await getMyToken();
        if (!token) throw new Error("Please log in to add products to your cart. 🤷‍♂️");
        const res = await fetch('https://ecommerce.routemisr.com/api/v2/cart/applyCoupon', {
            method: 'PUT',
            headers: {
                token: `${token}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ couponValue })
        })
        const payload = await res.json();
        return payload;
    } catch (err) {
        console.log(err)
    }
}
