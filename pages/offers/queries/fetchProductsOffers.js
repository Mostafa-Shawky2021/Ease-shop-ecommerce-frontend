import { axiosInstance } from '@root/lib';

const fetchProductsOffers = async (pageNumber, queryUrIStringfyFilter) => {

    const url = queryUrIStringfyFilter
        ? `/api/products?page=${pageNumber}&offer=true&${queryUrIStringfyFilter}`
        : `/api/products?page=${pageNumber}&offer=true`;

    const { data } = await axiosInstance.get(url);
    return data;
}

export default fetchProductsOffers;