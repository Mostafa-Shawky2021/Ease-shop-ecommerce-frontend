import { useQueryClient, useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify";

import { queryKeys } from "data";
import { incrementProduct } from "../queries"


const useIncrementProductData = (setIsLoading, setQuantity) => {

    const queryClient = useQueryClient();
    return useMutation(incrementProduct, {
        onMutate: () => {
            setIsLoading(true);
        },
        onSuccess: (data) => {
            setIsLoading(false);
            setQuantity(1);
            toast.success('تم زيادة عدد الكمية')
            const userId = JSON.parse(window.localStorage.getItem('guest')) || null
            queryClient.invalidateQueries(queryKeys.USER_CARTS(userId))
        },
        onError: () => {
            setIsLoading(false)
            toast.error('يوجد مشكله بالسيرفر')
        }
    })
}

export default useIncrementProductData;