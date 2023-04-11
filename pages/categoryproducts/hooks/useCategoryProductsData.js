import { useQuery } from "@tanstack/react-query";

import { fetchCategoryProducts } from "../queries";

import { queryKeys } from "../data";

const useCategoryProductsData = (pageNumber, queryUri) => {

    const categorySlug = queryUri.categorySlug;

    const urlSearchParams = new URLSearchParams();

    // exclude any request contain page number and dynamic category slug paramter 
    Object.entries(queryUri).forEach(([queryStringKey, queryStringValue]) => {

        if (queryStringKey !== 'page' && queryStringKey !== 'categorySlug') {
            urlSearchParams.set(queryStringKey, encodeURIComponent(queryStringValue));
        }
    })

    const urlSearchParamsToString = urlSearchParams.toString();

    return useQuery(
        queryKeys.CATEGORY_PRODUCTS(pageNumber, categorySlug, urlSearchParamsToString),
        () => fetchCategoryProducts(pageNumber, categorySlug, urlSearchParamsToString),
        { keepPreviousData: true }
    )
}


export default useCategoryProductsData;