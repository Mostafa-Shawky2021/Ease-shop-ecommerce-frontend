import { useQuery } from "@tanstack/react-query";

import { fetchProductsOffers } from "../queries";

import { queryKeys } from "data";


const useLatestProductsData = (pageNumber, queryUri) => {

    const urlSearchParams = new URLSearchParams();

    /*  
        ** extract the filter rules from the query string
        ** any request contain page number  we need to exclude it 
        ** from the uri so we avoid the repeating query string 
    */
    Object.entries(queryUri).forEach(([key, value]) => {

        if (key !== 'page') urlSearchParams.set(key, encodeURIComponent(value));

    });

    const urlSearchParamsToString = urlSearchParams.toString();

    return useQuery(
        queryKeys.PRODUCTS(pageNumber, urlSearchParamsToString),
        () => fetchProductsOffers(pageNumber, urlSearchParamsToString),
        { keepPreviousData: true });
}

export default useLatestProductsData;