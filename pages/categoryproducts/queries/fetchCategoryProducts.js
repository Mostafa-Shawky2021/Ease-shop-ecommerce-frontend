import { axiosInstance } from "lib";

const fetchCategoryProducts = async (pageNumber, categorySlug, queryUrIStringfyFilter) => {

    const url = queryUrIStringfyFilter
        ? `/api/categories/catslug/${categorySlug}?page=${pageNumber}&${queryUrIStringfyFilter}`
        : `/api/categories/catslug/${categorySlug}?page=${pageNumber}`;

    const { data } = await axiosInstance.get(url);
    return data;
}
export default fetchCategoryProducts;