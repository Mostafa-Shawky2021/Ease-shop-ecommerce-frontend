import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";


import { queryKeys } from "data";
import decremenetProduct from "queries/decrementProduct";

const useDecremenetProductData = (setIsLoading, setQuantity, quantity, setProductAdded) => {

    const queryClient = useQueryClient();
    return useMutation(decremenetProduct, {
        onMutate: () => {
            setIsLoading(true)
        },
        onSuccess: () => {
            const userId = JSON.parse(window.localStorage.getItem('guest')) || null;
            setIsLoading(false);
            quantity > 1 ? setQuantity(quantity - 1) : setProductAdded(false);
            toast.success('تم تقليل عدد الكمية');
            queryClient.invalidateQueries(queryKeys.USER_CARTS(userId))
        }

    })
}
export default useDecremenetProductData;