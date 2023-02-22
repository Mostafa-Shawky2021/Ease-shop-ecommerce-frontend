import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { queryKeys } from "../data";

import { fetchProducts } from "../queries";

const useSearchProductsData = (queryFilter) => {

    const urlSearchParams = new URLSearchParams();
    Object.entries(queryFilter).forEach(([key, value]) => {
        urlSearchParams.set(key, encodeURIComponent(value));
    })
    const urlSearchParamsToString = urlSearchParams.toString();
    return useQuery(
        queryKeys.SEARCH_PRODUCTS(urlSearchParamsToString),
        () => fetchProducts(urlSearchParamsToString),
    );
}

export default useSearchProductsData;