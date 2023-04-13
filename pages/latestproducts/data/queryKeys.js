const queryKeys = {
    PRODUCTS_LATEST: (pageNumber, queryUrIStringfyFilter) => (
        queryUrIStringfyFilter // if uri contain filtre query paramter generate key with that query
            ? ['products', pageNumber, 'latest', queryUrIStringfyFilter]
            : ['products', pageNumber, 'latest']),
}
export default queryKeys;