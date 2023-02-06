import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../data";
import { fetchProducts } from "../queries";

const useProductsData = () => {
    return useQuery(queryKeys.PRODUCTS, fetchProducts);
}
export default useProductsData;