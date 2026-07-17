'use server'
import getMyToken from '@/utility/getMyToken'

export default async function removeItem(id : string) {
    const token = await getMyToken()
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
        method: 'DELETE',
        headers: {
            token: `${token}`,
            'content-type': 'application/json'
        }
    })
    const payload = await response.json();
    return payload;
}
