'use server'
import getMyToken from '@/utility/getMyToken'

export default async function getLoggedUserCart() {
  try {
    const token = await getMyToken();
    if (!token) throw Error('please login to be able see cart');
    const res = await fetch('https://ecommerce.routemisr.com/api/v2/cart', {
      method: "GET",
      headers: {
        token: `${token}`,
        "Content-type": "application/json"
      }
    });
    const payload = await res.json();
    return payload;
  } catch (err) {
    return err;
  }
}
