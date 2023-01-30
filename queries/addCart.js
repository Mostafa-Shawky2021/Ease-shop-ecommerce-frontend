import { axiosInstance } from "lib";

const addCart = async (cartData) => {
    const { data } = await axiosInstance.post('/api/carts', cartData);
    return data;
}

export default addCart