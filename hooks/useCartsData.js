import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "data";
import { fetchCarts } from "queries";

const useCartsData = (userId) => {

    return useQuery(queryKeys.USER_CARTS(userId),
        () => fetchCarts(userId),
        { enabled: !!userId })

}
export default useCartsData;