const queryKeys = {
    USER_CARTS: (userId) => ['carts', userId],
    CATEGORIES: ['categories'],
    GUEST_ID: ['guest_id'],
    PRODUCT_VARIANTS: ['productvariant'],
    PRODUCTS: (pageNumber, queryUrIStringfyFilter) => (
        queryUrIStringfyFilter
            ? ['products', pageNumber, queryUrIStringfyFilter]
            : ['products', pageNumber]),

}
export default queryKeys