import { axiosInstance } from "lib";

const decremenetProduct = async (productData) => {
    const url = `/api/carts/${productData.productId}/user/${productData.userId}/decrement`;
    const { data } = await axiosInstance.post(url)
    return data;
}

export default decremenetProduct;