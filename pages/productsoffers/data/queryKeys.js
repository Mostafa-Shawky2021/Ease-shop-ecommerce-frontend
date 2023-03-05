const queryKeys = {
    PRODUCTS_OFFERS: (pageNumber, queryUrIStringfyFilter) => (
        queryUrIStringfyFilter
            ? ['products', pageNumber, 'offers', queryUrIStringfyFilter]
            : ['products', pageNumber, 'offers']),
}
export default queryKeys;