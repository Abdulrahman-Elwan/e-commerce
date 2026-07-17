'use server'

import getMyToken from "@/utility/getMyToken";
export default async function deleteUserAddress(id: string) {
    try {
        const token = await getMyToken();
        if (!token) throw new Error('Please log in first.');
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, {
            method: 'DELETE',
            headers: {
                token,
                "Content-type": "application/json",
            }
        });
        const payLoad = await res.json();
        return payLoad;
    } catch (err) {
        return err;
    }
}
