import { useQuery } from "@tanstack/react-query"

import { queryKeys } from "../data"
import { fetchLatestProducts } from "../queries"

const useLatestProductsData = () => {
    return useQuery(queryKeys.LATEST_PRODUCTS, fetchLatestProducts);

}
export default useLatestProductsData;