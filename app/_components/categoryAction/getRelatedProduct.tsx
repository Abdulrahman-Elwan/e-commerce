'use server'

export default async function getSpecificCategory(id: string) {
    if (!id) return
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`, {
            method: 'GET'
        })
        const payLoad = await res.json();
        return payLoad;
    } catch (err) {
        return err;
    }
}
