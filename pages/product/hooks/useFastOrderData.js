import { useMutation } from "@tanstack/react-query";
import { sendFastOrder } from "../queries";

import { useRouter } from "next/router";
const useFastOrderData = (setIsLoading, setShowModalOrder) => {
    const route = useRouter();
    return useMutation(sendFastOrder,
        {
            onMutate: () => {
                setIsLoading(true);
            },
            onSuccess: () => {
                setIsLoading(false);
                setShowModalOrder(false);
                route.push('/checkout/success');
            }
        }
    )
}
export default useFastOrderData;