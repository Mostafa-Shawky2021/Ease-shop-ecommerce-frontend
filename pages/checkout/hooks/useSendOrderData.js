import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendOrder } from "../queries";
import { queryKeys } from "data";
import { useGuest } from '@root/hooks';

const useSendOrderData = (setIsLoading) => {

    const route = useRouter();
    const queryClient = useQueryClient();
    const { guestId } = useGuest();

    return useMutation(sendOrder,
        {
            onMutate: () => {
                setIsLoading(true);
            },
            onSuccess: (res) => {
                setIsLoading(false);
                queryClient.setQueryData(queryKeys.USER_CARTS(guestId), (carts) => []);
                route.push({
                    pathname: '/checkout/success',
                    query: {
                        order_id: res.data.invoice_number
                    }
                });
            },
            onError: (error) => {
                setIsLoading(false);
                console.log(error);
            }
        }
    )
}

export default useSendOrderData;