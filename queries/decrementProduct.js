import { axiosInstance } from "lib";

const decremenetProduct = async (cartId) => {

    const url = `/api/carts/${cartId}/decrement`;
    const { data } = await axiosInstance.post(url);
    return data;

}

export default decremenetProduct;