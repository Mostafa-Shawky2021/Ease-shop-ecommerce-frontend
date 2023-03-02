import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../data";

import { fetchProductsOffers } from "../queries";

const useProductsOffersData = (pageNumber, queryUri) => {

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
        queryKeys.PRODUCTS_OFFERS(pageNumber, urlSearchParamsToString),
        () => fetchProductsOffers(pageNumber, urlSearchParamsToString),
        { keepPreviousData: true });
}

export default useProductsOffersData;