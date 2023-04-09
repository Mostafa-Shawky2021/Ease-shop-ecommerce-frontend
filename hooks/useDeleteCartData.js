import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteProduct } from "queries";
import { queryKeys } from "data";

const useDeleteCartData = (setIsLoading, guestId) => {

    const queryClient = useQueryClient();

    return useMutation(deleteProduct, {

        onMutate: () => setIsLoading(true),

        onSuccess: (res) => {

            setIsLoading(false);
            const deletedCartId = res?.data?.id;

            if (deletedCartId) {

                queryClient.setQueryData(queryKeys.USER_CARTS(guestId), (carts) =>
                    (carts.filter(cart => deletedCartId !== cart.id)));
            }

            toast.success('تم حذف المنتج بنجاح');
        },
        onError: () => {
            console.log('error with server');
        }
    })
}
export default useDeleteCartData;