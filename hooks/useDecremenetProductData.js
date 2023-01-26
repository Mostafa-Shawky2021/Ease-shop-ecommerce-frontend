import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";


import { queryKeys } from "data";
import decremenetProduct from "queries/decrementProduct";

const useDecremenetProductData = (setIsLoading) => {

    const queryClient = useQueryClient();
    return useMutation(decremenetProduct, {
        onMutate: () => {
            setIsLoading(true)
        },
        onSuccess: (res) => {
            const userId = JSON.parse(window.localStorage.getItem('guest')) || null
            const cartDataResponse = res.data;
            setIsLoading(false);
            queryClient.setQueryData(queryKeys.USER_CARTS(userId), (carts) => {
                if (cartDataResponse) {
                    return carts.map(cart => {
                        if (cartDataResponse.id === cart.id) {
                            return {
                                ...cart,
                                quantity: cartDataResponse.quantity,
                                total_price: cartDataResponse.total_price
                            }
                        } else {
                            return { ...cart }
                        }
                    })
                }
                else {
                    queryClient.invalidateQueries(queryKeys.USER_CARTS(userId));
                }

            })
            toast.success('تم تقليل عدد الكمية')
        },
        onError: () => {
            setIsLoading(false)
            toast.error('يوجد مشكله بالسيرفر')
        }

    })
}
export default useDecremenetProductData;