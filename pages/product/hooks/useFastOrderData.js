import { useMutation } from "@tanstack/react-query";
import { sendFastOrder } from "../queries";

import { useRouter } from "next/router";
const useFastOrderData = (setIsLoading, setShowModalOrder) => {
	const route = useRouter();

	return useMutation(sendFastOrder, {
		onMutate: () => {
			setIsLoading(true);
		},
		onSuccess: (res) => {
			setIsLoading(false);
			setShowModalOrder(false);
			route.push({
				pathname: "/checkout/success",
				query: {
					order_id: res.data.invoice_number,
				},
			});
		},
		onError: () => {
			setIsLoading(false);
			setShowModalOrder(false);
			console.log("error with server");
		},
	});
};
export default useFastOrderData;
