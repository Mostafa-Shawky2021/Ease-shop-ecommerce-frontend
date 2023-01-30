const calcCartsCount = (carts) => {
    let count = 0;
    for (const product of carts) {
        count += product.quantity;
    }
    return count;
}

export default calcCartsCount;