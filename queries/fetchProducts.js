import { axiosInstance } from "@root/lib";

const fetchProducts = async (pageNumber, queryUrIStringfyFilter) => {
	const url = queryUrIStringfyFilter ? `/api/products?page=${pageNumber}&${queryUrIStringfyFilter}` : `/api/products?page=${pageNumber}`;

	const { data } = await axiosInstance.get(url);

	return data;
};

export default fetchProducts;
