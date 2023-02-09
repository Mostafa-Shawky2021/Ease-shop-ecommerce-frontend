import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useGuest } from "@root/hooks";

import { decrementProduct } from "@root/queries";

import { queryKeys } from "data";

const useDecrementProductData = (setIsLoading) => {
    const queryClient = useQueryClient();
    const { guestId } = useGuest();

    return useMutation(decrementProduct,
        {
            onMutate: () => {
                setIsLoading(true)
            },
            onSuccess: (res) => {
                const cartDataResponse = res.data;
                setIsLoading(false);
                queryClient.setQueryData(
                    queryKeys.USER_CARTS(guestId),
                    (carts) => {
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
                            // delete cart data from querychache if the product less than 1
                            queryClient.invalidateQueries(queryKeys.USER_CARTS(guestId));
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
export default useDecrementProductData;