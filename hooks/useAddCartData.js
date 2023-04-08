import { useQueryClient, useMutation } from "@tanstack/react-query"

import { addCart } from "queries"

import { queryKeys } from "data";

import { toast } from "react-toastify";

const useAddCartData = (setIsLoading, guestId) => {

    const queryClient = useQueryClient();

    return useMutation(addCart, {
        onMutate: () => {
            setIsLoading && setIsLoading(true);
        },

        onSuccess: (res, oldAddedCartData) => {

            setIsLoading && setIsLoading(false);
            toast.success("تم اضافة المنتج بنجاح");
            const cartDataResponse = res.data;

            queryClient.setQueriesData(
                queryKeys.USER_CARTS(guestId),
                (carts) => [...carts, cartDataResponse])

        },

        onError: () => {
            setIsLoading(false)
            console.log('Error with server')
        }
    })
}

export default useAddCartData;