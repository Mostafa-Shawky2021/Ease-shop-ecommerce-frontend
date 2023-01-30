import { axiosInstance } from "lib";

const decremenetProduct = async (cartData) => {

    const url = `/api/carts/${cartData.cartId}/decrement`;
    const { data } = await axiosInstance.post(url);
    return data;

}

export default decremenetProduct;