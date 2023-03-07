
const queryKeys = {
    CATEGORY_PRODUCTS: (pageNumber, categorySlug, queryUrIStringfyFilter) => (

        queryUrIStringfyFilter
            ? ['categories', pageNumber, categorySlug, queryUrIStringfyFilter]
            : ['categories', pageNumber, categorySlug]),

}

export default queryKeys;

