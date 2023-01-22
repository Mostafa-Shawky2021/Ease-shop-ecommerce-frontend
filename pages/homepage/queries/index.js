import { axiosInstance } from "lib";

// this file contains fetcher function for homepage data
export const fetchLatestProducts = async () => {
    const { data } = await axiosInstance.get('/api/products/latestproducts');
    return data;
} 
