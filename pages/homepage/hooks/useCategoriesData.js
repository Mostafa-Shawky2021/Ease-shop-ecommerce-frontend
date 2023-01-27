import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../data";
import { fetchCategories } from "../queries";

const useCategoriesData = () => {
    return useQuery(queryKeys.CATEGORIES, fetchCategories)
}
export default useCategoriesData;