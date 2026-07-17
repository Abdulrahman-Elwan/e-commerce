'use server'

export default async function getAllProducts(queryString: string = "") {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?${queryString}`,
            {
                // علشان كل مرة تغير فلتر يعمل Request جديد.
                cache: "no-store",
            }
        );
        const { data } = await response.json();
        return data;
    } catch (err) {
        return [err];
    }
}