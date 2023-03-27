import { useQueryClient, useMutation } from "@tanstack/react-query"
import { queryKeys } from "data";
import { addCart } from "queries"
import { toast } from "react-toastify";

const useAddCartData = (setIsLoading) => {

    const queryClient = useQueryClient();

    return useMutation(addCart, {
        onMutate: () => {
            setIsLoading && setIsLoading(true)
        },
        onSuccess: (res) => {

            setIsLoading && setIsLoading(false);
            toast.success("تم اضافة المنتج بنجاح");
            const userId = JSON.parse(window.localStorage.getItem('guest')) || null;
            const cartDataResponse = res.data;

            queryClient.setQueriesData(
                queryKeys.USER_CARTS(userId),
                (carts) => [...carts, cartDataResponse])

        },
        onError: () => {
            setIsLoading(false)
            toast.error('يوجد مشكله بالسيرفر')
        }
    })
}

export default useAddCartData;