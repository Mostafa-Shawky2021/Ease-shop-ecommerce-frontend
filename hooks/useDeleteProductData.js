import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteProduct } from "queries";
import { queryKeys } from "data";

const useDeleteProductData = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteProduct, {
        onSuccess: (res) => {
            const deletedCartId = res.data.id;
            const userId = JSON.parse(window.localStorage.getItem('guest')) || null
            queryClient.setQueryData(queryKeys.USER_CARTS(userId), (carts) => {
                return carts.filter(cart => deletedCartId !== cart.id)
            });
            toast.success('تم حذف المنتج بنجاح')
        },
        onError: () => {
            toast.error('يوجد مشكلة بالسيرفر');
        }
    })
}
export default useDeleteProductData;