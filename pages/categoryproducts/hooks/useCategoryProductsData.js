import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../data";
import { fetchCategoryProducts } from "../queries";

const useCategoryProductsData = (pageNumber, queryUri) => {

    const categorySlug = queryUri.categorySlug;

    const urlSearchParams = new URLSearchParams();

    /*  
        ** any request contain page number and dynamic category slug paramter so we need to exclude it 
        ** from the uri so we avoid the repeating query string 
    */
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