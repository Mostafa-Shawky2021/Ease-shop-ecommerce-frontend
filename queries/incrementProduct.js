import { axiosInstance } from "lib";

const incrementProduct = async (cartData) => {
    const url = `/api/carts/${cartData.cartId}/increment`;
    const quantity = cartData.quantity ? { quantity: cartData.quantity } : undefined;
    const { data } = await axiosInstance.post(url, quantity);
    return data;
}

export default incrementProduct;