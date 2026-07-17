'use server'
import { AddressFormType } from '@/formSchema/addressForm.schema';
import getMyToken from '@/utility/getMyToken';

export default async function postAddresses(data : AddressFormType) {
    try{
        const token = await getMyToken();
        if(!token) throw new Error('Please log in first.')
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/addresses', {
            method: 'POST',
            headers: {
                token,
                "Content-type": "application/json" ,
            },
            body: JSON.stringify(data)
        });
        const payLoad = await res.json();
        return payLoad;
    }catch(err){
        return [err];
    }
}
