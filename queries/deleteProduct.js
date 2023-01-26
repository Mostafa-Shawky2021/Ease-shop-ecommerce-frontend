const { axiosInstance } = require("lib")

const deleteProduct = async (cartId) => {
    const { data } = await axiosInstance.delete(`/api/carts/${cartId}`);
    return data;
}
export default deleteProduct;