import { useQuery } from "@tanstack/react-query"

import { queryKeys } from "../data"
import { fetchLatestProducts } from "../queries"

export const useLatestProducs = () => {
    return useQuery(queryKeys.LATEST_PRODUCTS, fetchLatestProducts);

}