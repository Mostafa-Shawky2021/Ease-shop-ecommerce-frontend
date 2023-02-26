
const queryKeys = {
    CATEGORY_PRODUCTS: (pageNumber, categorySlug, queryUrIStringfyFilter) => (
        queryUrIStringfyFilter
            ? ['categories', pageNumber, categorySlug]
            : ['categories', pageNumber]),

}

export default queryKeys;

