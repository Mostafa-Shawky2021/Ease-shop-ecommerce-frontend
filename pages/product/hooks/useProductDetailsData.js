import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../data"
import { fetchProductDetails } from "../queries"

const useProductDetailsData = (productSlug) => {

    return useQuery(
        queryKeys.PRODUCT_DETAILS(productSlug),
        () => fetchProductDetails(productSlug))
}

export default useProductDetailsData
