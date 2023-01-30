import { axiosInstance } from "lib";
const fetchProductsRelated = async (productSlug) => {

    const { data } = await axiosInstance.get(`/api/products/productslug/${productSlug}/related`);
    return data;
}
export default fetchProductsRelated;