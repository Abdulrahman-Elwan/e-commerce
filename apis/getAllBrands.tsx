'use server'

export default async function getAllBrands() {
    try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/brands');
        const { data } = await res.json();
        return data;
    } catch (err) {
        return err;
    }
}
