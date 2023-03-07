import { useQuery } from "@tanstack/react-query";

import { fetchProductsOffers } from "../queries";

import { generateQueryStringFilter } from "@root/utils";

import { queryKeys } from "data";

const useProductsOffersData = (pageNumber, queryUri) => {

    let queryStringFilter = generateQueryStringFilter(queryUri);

    return useQuery(
        queryKeys.PRODUCTS(pageNumber, queryStringFilter),
        () => fetchProductsOffers(pageNumber, queryStringFilter),
        { keepPreviousData: true });
}

export default useProductsOffersData;