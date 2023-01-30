import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../data";
import { fetchProductsRelated } from "../queries";
const useRelatedProductsData = (productSlug) => {
    return useQuery(
        queryKeys.PRODUCT_RELATED(productSlug),
        () => fetchProductsRelated(productSlug))
}
export default useRelatedProductsData;