import { axiosInstance } from "lib";
import parse from "html-react-parser";

// this file contains fetcher function for productdetails data
const fetchProductDetails = async (productSlug) => {
	const { data } = await axiosInstance.get(`/api/products/productslug/${productSlug}`);
	return data;
};

export default fetchProductDetails;
