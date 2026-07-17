'use server'

export default async function verifyResetCode(data : {"resetCode": string}) {
    try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
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
