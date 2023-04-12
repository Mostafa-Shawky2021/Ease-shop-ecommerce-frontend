import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "data";

import { fetchProducts } from "@root/queries";

import { generateQueryStringFilter } from "@root/utils";

const useProductsData = (pageNumber, queryUri) => {

    const queryProductsUriFilter = generateQueryStringFilter(queryUri)

    return useQuery(
        queryKeys.PRODUCTS(pageNumber, queryProductsUriFilter),
        () => fetchProducts(pageNumber, queryProductsUriFilter),
    );
}

export default useProductsData;