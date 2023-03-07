import { axiosInstance } from '@root/lib';

const fetchLatestProducts = async (pageNumber, queryUrIStringfyFilter) => {
    const url = queryUrIStringfyFilter
        ? `/api/products?page=${pageNumber}&latest=true&${queryUrIStringfyFilter}`
        : `/api/products?page=${pageNumber}&latest=true`;

    const { data } = await axiosInstance.get(url);
    return data;
}

export default fetchLatestProducts;