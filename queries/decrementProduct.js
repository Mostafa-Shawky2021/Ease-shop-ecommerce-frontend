import { axiosInstance } from "lib";

const decrementProduct = async (cartData) => {

    const url = `/api/carts/${cartData.cartId}/decrement`;
    const { data } = await axiosInstance.put(url);
    return data;

}

export default decrementProduct;