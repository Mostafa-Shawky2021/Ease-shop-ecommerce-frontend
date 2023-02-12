import { axiosInstance } from "lib/axios";

const sendFastOrder = async (orderData) => {
    const url = `/api/orders/checkout/fastorder`;
    const { data } = await axiosInstance.post(url, orderData);
    return data;
}

export default sendFastOrder;