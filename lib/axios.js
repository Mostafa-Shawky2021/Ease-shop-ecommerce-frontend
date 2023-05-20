import axios from "axios";

import { url } from "data";

const axiosInstance = axios.create({
	baseURL: url,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
		"X-Requested-With": "XMLHttpRequest",
		Authorization: "Bearer 1|nWkyASQwMveqlJ5J9KoYKgiImJauwNwQzFgRrhNS",
	},
});

export { axiosInstance };
