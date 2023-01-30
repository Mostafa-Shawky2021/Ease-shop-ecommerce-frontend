
const queryKeys = {
    PRODUCT_DETAILS: (productSlug) => ['products', productSlug],
    PRODUCT_RELATED: (productId) => ['products', 'related', productId],
}

export default queryKeys;

