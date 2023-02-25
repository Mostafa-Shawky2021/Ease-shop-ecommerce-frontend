import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../data";
import { fetchCategoryProducts } from "../queries";

const useCategoryProductsData = (categorySlug, pageNumber) => {

    // const urlSearchParams = new URLSearchParams();

    // // this condition if the uri contain query string filteration for products
    // if (queryUri) {
    //     Object.entries(queryUri).forEach(([key, value]) => {
    //         urlSearchParams.set(key, encodeURIComponent(value));
    //     })

    // }
    // const urlSearchParamsToString = urlSearchParams.toString();
    return useQuery(
        queryKeys.CATEGORY_PRODUCTS(categorySlug, pageNumber),
        () => fetchCategoryProducts(categorySlug, pageNumber),
        { keepPreviousData: true }
    )
}


export default useCategoryProductsData;