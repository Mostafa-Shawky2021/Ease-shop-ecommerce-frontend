import { axiosInstance } from "lib/axios";

const sendMessage = async (messageInfo) => {
	const { data } = await axiosInstance.post("/api/messages", messageInfo);
	return data;
};

export default sendMessage;
