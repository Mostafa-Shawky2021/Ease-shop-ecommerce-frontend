import { axiosInstance } from "@root/lib";

const sendOrder = async (orderData) => {
    const { data } = await axiosInstance.post('/api/orders/checkout', orderData);
    return data;
}
export default sendOrder;