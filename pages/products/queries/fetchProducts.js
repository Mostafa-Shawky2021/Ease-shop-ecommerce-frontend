import { axiosInstance } from '@root/lib';

const fetchProducts = async (queryUrlFilter) => {

    const url = `/api/products?${queryUrlFilter}`;
    const { data } = await axiosInstance.get(url);
    return data;
}

export default fetchProducts;