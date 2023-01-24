import { axiosInstance } from "lib";

const incrementProduct = async (cartData) => {
    console.log(cartData);
    const url = `/api/carts/${cartData.cartId}/increment`
    const { data } = await axiosInstance.post(url, { quantity: cartData.quantity });
    return data;
}

export default incrementProduct;