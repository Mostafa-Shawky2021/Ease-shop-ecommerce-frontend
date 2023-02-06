import { axiosInstance } from "lib";

const fetchProducts = async (pageNumber) => {
    const url = `/api/products?page=${pageNumber}`;
    const { data } = await axiosInstance.get(url);
    return data;
}
export default fetchProducts;