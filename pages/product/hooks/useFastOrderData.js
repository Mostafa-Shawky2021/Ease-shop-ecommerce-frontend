import { useMutation } from "@tanstack/react-query";
import { sendFastOrder } from "../queries";

const useFastOrderData = () => {
    return useMutation(sendFastOrder)
}
export default useFastOrderData;