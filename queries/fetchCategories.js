import { axiosInstance } from "lib";
const fetchCategories = async () => {
    const { data } = await axiosInstance.get('/api/categories');
    return data;
}
export default fetchCategories;