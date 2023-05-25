import { axiosInstance } from "lib";

const fetchCategories = async (limit = null) => {
	const url = limit ? `/api/categories?limit=${limit}` : "/api/categories";

	const { data } = await axiosInstance.get(url);
	return data;
};
export default fetchCategories;
