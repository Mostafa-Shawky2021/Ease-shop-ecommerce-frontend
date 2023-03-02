
const queryKeys = {
    CATEGORY_PRODUCTS: (pageNumber, categorySlug, queryUrIStringfyFilter) => (
        queryUrIStringfyFilter
            ? ['categories', pageNumber, categorySlug, queryUrIStringfyFilter]
            : ['categories', pageNumber, queryUrIStringfyFilter]),

}

export default queryKeys;

