'use server'

import getMyToken from '@/utility/getMyToken'

export default async function ClearUserCart() {
    const token = await getMyToken();
    if (!token) throw Error('please login to be able see cart');
    const clearCart = await fetch('https://ecommerce.routemisr.com/api/v1/cart' , {
        method: 'DELETE',
        headers: {
            token: `${token}`,
            "content-type": "aplication/json"
        }
    })
    const payload = await clearCart.json();
    return payload;
}
