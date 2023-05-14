const queryKeys = {
	BEST_SELLER: (pageNumber, queryUrIStringfyFilter) =>
		queryUrIStringfyFilter // if uri contain filtre query paramter generate key with that query
			? ["products", pageNumber, "best-seller", queryUrIStringfyFilter]
			: ["products", pageNumber, "best-seller"],
};
export default queryKeys;
