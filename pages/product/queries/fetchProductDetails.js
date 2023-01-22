import { axiosInstance } from "lib";

// this file contains fetcher function for productdetails data
const fetchProductDetails = async (productSlug) => {
    const { data } = await axiosInstance.get(`/api/products/name/${productSlug}`);
    return data;
}


export default fetchProductDetails;