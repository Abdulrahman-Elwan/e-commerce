'use server'
import getMyToken from '@/utility/getMyToken'

export default async function updateCartProductQuantity(id: string, count: string) {
    const token = await getMyToken();
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        method: 'PUT',
        headers: {
            token: `${token}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify({ count })
    })
    const payload = await response.json();
    return payload;
}
