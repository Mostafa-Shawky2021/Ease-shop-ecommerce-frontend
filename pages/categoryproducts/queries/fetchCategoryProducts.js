import { axiosInstance } from "lib";
const fetchCategoryProducts = async (categorySlug, pageNumber) => {
    const url = `/api/categories/catslug/${categorySlug}?page=${pageNumber}`;
    const { data } = await axiosInstance.get(url);
    return data;
}
export default fetchCategoryProducts;