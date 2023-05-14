import { useQuery } from "@tanstack/react-query";

import { fetchProductsBestSeller } from "../queries";

import { generateQueryStringFilter } from "@root/utils";

import { queryKeys } from "../data";

const useProductsBestSeller = (pageNumber, queryUri) => {
	let queryStringFilter = generateQueryStringFilter(queryUri);

	return useQuery(queryKeys.BEST_SELLER(pageNumber, queryStringFilter), () => fetchProductsBestSeller(pageNumber, queryStringFilter), {
		keepPreviousData: true,
		onError: (error) => console.log(error),
	});
};

export default useProductsBestSeller;
