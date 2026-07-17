'use server';
import getMyToken from '@/utility/getMyToken';

export default async function getUserAddress() {
    try {
        const token = await getMyToken();
        if (!token) throw new Error('Please log in first.');
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/addresses', {
            method: 'GET',
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

