import { axiosInstance } from "@root/lib";

const fetchProductsBestSeller = async (pageNumber, queryUrIStringfyFilter) => {
	const url = queryUrIStringfyFilter ? `/api/products?page=${pageNumber}&best-seller=true&${queryUrIStringfyFilter}` : `/api/products?page=${pageNumber}&best-seller=true`;

	const { data } = await axiosInstance.get(url);
	return data;
};

export default fetchProductsBestSeller;
