import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../data";
import { fetchCategoryProducts } from "../queries";

const useCategoryProductsData = (categorySlug, pageNumber) => {

    return useQuery(
        queryKeys.CATEGORY_PRODUCTS(categorySlug, pageNumber),
        () => fetchCategoryProducts(categorySlug, pageNumber),
        { keepPreviousData: true }
    )
}


export default useCategoryProductsData;