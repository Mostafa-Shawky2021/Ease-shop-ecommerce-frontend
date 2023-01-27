import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../data"
import { fetchRandomCategoriesProducts } from "../queries"
const useRandomCategoriesProductsData = () => {
    return useQuery(queryKeys.RANDOM_CATEGORIES_PRODUCTS, fetchRandomCategoriesProducts)
}

export default useRandomCategoriesProductsData;