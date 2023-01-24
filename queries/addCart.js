const { axiosInstance } = require("lib")

const addCart = async (cartData) => {
    const { data } = await axiosInstance.post('/api/carts', cartData);
    return data;
}

export default addCart