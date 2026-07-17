'use server'

import { AddReviewFormSchemaType } from '@/app/_components/Reviews/addReviewForm'
import getMyToken from '@/utility/getMyToken';

export default async function addReview(data : AddReviewFormSchemaType , productId : string) {
    try{
        const token = await getMyToken();
                if(!token) throw new Error('Please log in first.')
                const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`, {
                    method: 'POST',
                    headers: {
                        token: `${token}`,
                        "Content-type": "application/json" ,
                    },
                    body: JSON.stringify(data)
                });
                const payLoad = await res.json();
                return payLoad;
    }catch(err){
        return err;
    }
}
