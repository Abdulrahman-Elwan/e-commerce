'use server'

export default async function getReviewsforProduct(id: string) {
    try{
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}/reviews`);
        const payLoad = await res.json();
        return payLoad;
    }catch(err){
        return err;
    }
}
