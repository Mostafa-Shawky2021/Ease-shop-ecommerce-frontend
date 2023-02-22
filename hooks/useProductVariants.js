import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "data";
import { fetchProductVariants } from "@root/queries";

const useProductVariants = () => {
    return useQuery(
        queryKeys.PRODUCT_VARIANTS,
        fetchProductVariants,
    );
}

export default useProductVariants;