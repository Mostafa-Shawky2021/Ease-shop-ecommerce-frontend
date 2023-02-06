import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../data";
import { fetchProducts } from "../queries";

const useProductsData = (pageNumber) => {
    return useQuery(
        queryKeys.PRODUCTS(pageNumber),
        () => fetchProducts(pageNumber),
        { keepPreviousData: true });
}
export default useProductsData;