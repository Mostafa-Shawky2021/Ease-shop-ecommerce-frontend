import { axiosInstance } from "lib";

const fetchLayout = async () => {
    const { data } = await axiosInstance.get("api/layout");
    return data;
}

export default fetchLayout;