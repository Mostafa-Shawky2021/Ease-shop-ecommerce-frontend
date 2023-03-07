import { axiosInstance } from "lib";

const fetchLatestProducts = async () => {
    const { data } = await axiosInstance.get('/api/products/latestproducts');
    return data;
}
export default fetchLatestProducts;     
