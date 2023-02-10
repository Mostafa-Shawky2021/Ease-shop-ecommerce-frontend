import { useMutation } from "@tanstack/react-query";
import { sendOrder } from "../queries";

const useSendOrderData = () => {
    return useMutation(sendOrder,
        {
            onSuccess: (data) => console.log(data)
        }
    )
}

export default useSendOrderData;