import { axiosInstance } from "lib"

const fetchRandomCategoriesProducts = async () => {
    const { data } = await axiosInstance('/api/categories/products/random');
    return data;
}
export default fetchRandomCategoriesProducts