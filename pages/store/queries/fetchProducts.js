import { axiosInstance } from "lib";

const fetchProducts = async () => {
    const { data } = await axiosInstance.get('/api/products')
    return data;
}
export default fetchProducts;