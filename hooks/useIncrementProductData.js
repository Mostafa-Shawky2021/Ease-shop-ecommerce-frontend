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
        onSuccess: (res) => {

            const userId = JSON.parse(window.localStorage.getItem('guest')) || null
            const cartDataResponse = res.data;
            setIsLoading(false);
            queryClient.setQueryData(queryKeys.USER_CARTS(userId), (carts) => {
                return carts.map(cart => {
                    if (cartDataResponse.id === cart.id) {
                        return { ...cart, quantity: cartDataResponse.quantity }
                    } else {
                        return { ...cart }
                    }
                })
            })
            setQuantity && setQuantity(1);
            toast.success('تم زيادة عدد الكمية')


        },
        onError: () => {
            setIsLoading(false)
            toast.error('يوجد مشكله بالسيرفر')
        }
    })
}

export default useIncrementProductData;