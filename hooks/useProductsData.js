import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "data";

import { fetchProducts } from "@root/queries";

const useProductsData = (pageNumber, queryUri) => {

    const urlSearchParams = new URLSearchParams();

    /*  
        ** any request contain page number  we need to exclude it 
        ** from the uri so we avoid the repeating query string 
    */
    Object.entries(queryUri).forEach(([key, value]) => {
        if (key !== 'page') urlSearchParams.set(key, encodeURIComponent(value));

    })

    const urlSearchParamsToString = urlSearchParams.toString();

    return useQuery(
        queryKeys.PRODUCTS(pageNumber, urlSearchParamsToString),
        () => fetchProducts(pageNumber, urlSearchParamsToString),
        { keepPreviousData: true });
}

export default useProductsData;