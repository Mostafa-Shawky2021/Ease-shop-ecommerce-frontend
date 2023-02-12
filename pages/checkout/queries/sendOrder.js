import { axiosInstance } from "@root/lib";

const sendOrder = async (orderData) => {
    const url = `/api/orders/checkout`;
    const { data } = await axiosInstance.post(url, orderData);
    return data;
}
export default sendOrder;