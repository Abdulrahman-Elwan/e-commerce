'use server'
import { ResetPasswordSchemaType } from '@/app/_components/forgotPassword/resetPasswordForm';

export default async function resetPassword(data : ResetPasswordSchemaType) {
    try{
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
            method: 'PUT',
            headers: {
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

