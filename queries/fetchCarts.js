import { axiosInstance } from "lib";

const fetchCarts = async (userId) => {
    const { data } = await axiosInstance.get(`/api/carts/user/${userId}`)
    return data
}


export default fetchCarts; 