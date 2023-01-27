import { axiosInstance } from "lib"

const fetchRandomCategoriesProducts = async () => {
    const { data } = await axiosInstance('/api/categories/random/products');
    return data;
}
export default fetchRandomCategoriesProducts