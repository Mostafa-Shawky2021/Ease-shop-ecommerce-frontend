import { useQueryClient, useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify";

import { queryKeys } from "data";
import { incrementProduct } from "../queries"


const useIncrementProductData = (setIsLoading, setQuantity, setProductAdded) => {

    const queryClient = useQueryClient();
    return useMutation(incrementProduct, {
        onMutate: () => {
            setIsLoading(true);
        },
        onSuccess: (data) => {
            setIsLoading(false);
            setQuantity((quan) => quan + 1)
            setProductAdded(true);
            toast.success('تم زيادة عدد الكمية')
            const userId = JSON.parse(window.localStorage.getItem('guest')) || null
            queryClient.invalidateQueries(queryKeys.USER_CARTS(userId))
        }
    })
}

export default useIncrementProductData;