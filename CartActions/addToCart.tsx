'use server'
import getMyToken from '../utility/getMyToken'

export default async function addToCart(id: string) {
    try {
        const token = await getMyToken();
        if (!token) throw new Error("Please log in to add products to your cart. 🤷‍♂️");
        const response = await fetch(`${process.env.API}/cart`, {
            method: 'POST',
            headers: {
                token: `${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ "productId": id })
        });
        const payLoad = response.json();

        return payLoad;
    } catch (err) {
        return err;
    }
}
