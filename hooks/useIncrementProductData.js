import { useQueryClient, useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify";

import { useGuest } from "@root/hooks";

import { queryKeys } from "data";
import { incrementProduct } from "../queries"


const useIncrementProductData = (setIsLoading, setQuantity) => {

    const { guestId } = useGuest();
    const queryClient = useQueryClient();

    return useMutation(incrementProduct,
        {
            onMutate: () => {
                setIsLoading && setIsLoading(true);
            },
            onSuccess: (res) => {
                const cartDataResponse = res.data;
                setIsLoading && setIsLoading(false);
                queryClient.setQueryData(
                    queryKeys.USER_CARTS(guestId),
                    (carts) => {
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
                    });
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