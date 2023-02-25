import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "data";

import { fetchProducts } from "@root/queries";

const useProductsData = (pageNumber, queryUri) => {

    const urlSearchParams = new URLSearchParams();

    // this condition if the uri contain query string filteration for products
    if (queryUri) {
        Object.entries(queryUri).forEach(([key, value]) => {
            urlSearchParams.set(key, encodeURIComponent(value));
        })

    }
    const urlSearchParamsToString = urlSearchParams.toString();
    return useQuery(
        queryKeys.PRODUCTS(pageNumber, urlSearchParamsToString),
        () => fetchProducts(pageNumber, urlSearchParamsToString),
        { keepPreviousData: true });
}

export default useProductsData;