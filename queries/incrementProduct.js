import { axiosInstance } from "lib";

const incrementProduct = async (productData) => {
    const url = `/api/carts/${productData.productId}/user/${productData.userId}/increment`
    const { data } = await axiosInstance.post(url);
    return data;
}

export default incrementProduct;