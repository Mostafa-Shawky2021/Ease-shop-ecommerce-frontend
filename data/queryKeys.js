const queryKeys = {
	LAYOUT: ["layout"],
	USER_CARTS: (userId) => ["carts", userId],
	CATEGORIES: (limit = null) => {
		return limit ? ["categories", limit] : ["categories"];
	},
	GUEST_ID: ["guest_id"],
	PRODUCT_VARIANTS: ["productvariant"],
	PRODUCTS: (pageNumber, queryUrIStringfyFilter) => (queryUrIStringfyFilter ? ["products", pageNumber, queryUrIStringfyFilter] : ["products", pageNumber]),
};
export default queryKeys;
