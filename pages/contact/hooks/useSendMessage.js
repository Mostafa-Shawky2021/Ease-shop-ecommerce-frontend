import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../queries";
import { toast } from "react-toastify";

const useMessage = () => {
	const { push } = useRouter();
	return useMutation(sendMessage, {
		onSuccess: () => {
			toast.success("تم الارسال بنجاح!");
			setTimeout(() => push("/homepage"), 1000);
		},
		onError: (error) => {
			console.log(error);
		},
	});
};

export default useMessage;
