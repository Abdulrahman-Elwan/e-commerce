'use server';
import { checkoutSchemaType } from '@/formSchema/checkout.schema';
import getMyToken from '@/utility/getMyToken';

export default async function checkoutCard(id: string, shippingValues: checkoutSchemaType) {
    const baseURL = process.env.NEXT_URL;
    const { city, details, phone } = shippingValues;
    const token = await getMyToken();
    if (!token) throw new Error("Please login first. 🤷‍♂️");
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${baseURL}`, {
            method: 'POST',
            headers: {
                token: `${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "shippingAddress": {
                    details,
                    phone,
                    city
                }
            })
        })
        const payload = await res.json();
        return payload;
    } catch (err) {
        return err;
    }
}
