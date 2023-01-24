import { useQueryClient, useMutation } from "@tanstack/react-query"
import { queryKeys } from "data";
import { addCart } from "queries"
import { toast } from "react-toastify";

const useAddCartData = (setIsLoading, setProductAdded) => {

    const queryClient = useQueryClient();
    return useMutation(addCart, {
        onMutate: () => {
            setIsLoading(true)
        },
        onSuccess: () => {
            setIsLoading(false);
            setProductAdded(true)
            toast.success("تم اضافة المنتج بنجاح");
            const userId = JSON.parse(window.localStorage.getItem('guest')) || null
            queryClient.invalidateQueries(queryKeys.USER_CARTS(userId))

        }
    })
}

export default useAddCartData;