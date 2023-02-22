import { axiosInstance } from '@root/lib';

const fetchProductVariants = async () => {
    const { data } = await axiosInstance.get('/api/productvariants');
    return data;
}

export default fetchProductVariants