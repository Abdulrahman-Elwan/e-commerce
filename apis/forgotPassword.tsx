'use server'

import { ForgotPasswordSchemaType } from '@/app/_components/forgotPassword/forgotPasswordForm';
export default async function forgotPassword(data: ForgotPasswordSchemaType) {
    try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        const payLoad = await res.json();
        return payLoad;
    } catch (err) {
        return {
            status: err,
            message: "Something went wrong",
        };
    }
}
