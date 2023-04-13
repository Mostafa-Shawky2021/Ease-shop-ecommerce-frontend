import { useQuery } from "@tanstack/react-query";

import { fetchLatestProducts } from "../queries";

import { generateQueryStringFilter } from "@root/utils";

import { queryKeys } from "../data";

const useLatestProductsData = (pageNumber, queryUri) => {

    let queryStringFilter = generateQueryStringFilter(queryUri);

    return useQuery(
        queryKeys.PRODUCTS_LATEST(pageNumber, queryStringFilter),
        () => fetchLatestProducts(pageNumber, queryStringFilter),
        { keepPreviousData: true });
}

export default useLatestProductsData;