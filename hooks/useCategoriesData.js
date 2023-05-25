import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../data";
import { fetchCategories } from "@root/queries";

const useCategoriesData = (limit = null) => {
	return useQuery(queryKeys.CATEGORIES(limit), () => fetchCategories(limit));
};
export default useCategoriesData;
