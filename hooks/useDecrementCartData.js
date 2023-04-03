import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { decrementProduct } from "@root/queries";

import { queryKeys } from "data";

const useDecrementCartData = (setIsLoading, guestId) => {

    const queryClient = useQueryClient();

    return useMutation(decrementProduct,
        {
            onMutate: () => setIsLoading(true),

            onSuccess: (res) => {

                const cartDataResponse = res?.data;

                setIsLoading(false);

                queryClient.setQueryData(
                    queryKeys.USER_CARTS(guestId),
                    (carts) => {

                        if (cartDataResponse?.id) {

                            return carts.map(cart => {

                                if (cartDataResponse.id === cart.id) {

                                    return {
                                        ...cart,
                                        quantity: cartDataResponse.quantity,
                                        total_price: cartDataResponse.total_price
                                    }
                                } else {

                                    return { ...cart };
                                }
                            })

                            toast.success('تم تقليل الكمية');
                        }
                        else {

                            // delete cart data from querychache if the product less than 1
                            queryClient.setQueryData(

                                queryKeys.USER_CARTS(guestId),
                                (carts) => carts.filter(cart => cart.id !== cartDataResponse.deletedCartId));

                            toast.success('تم  حذف المنتج من سلة المشريات ');
                        }

                    })

            },
            onError: (error) => {
                console.log(error);
                setIsLoading(false);
            }

        })
}
export default useDecrementCartData;