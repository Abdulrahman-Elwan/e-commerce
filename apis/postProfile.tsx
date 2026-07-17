'use server'

import { ProfileFormType } from '@/formSchema/profileForm.schema';
import getMyToken from '@/utility/getMyToken';

export default async function postProfile(data : ProfileFormType) {
    try{
        const token = await getMyToken();
        if(!token) throw new Error('Please log in first.')
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/users/updateMe/', {
            method: 'PUT',
            headers: {
                token: `${token}`,
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

