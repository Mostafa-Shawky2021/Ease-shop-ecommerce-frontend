const calcTotalPrice = (carts) => {
    let sum = 0;
    if (Array.isArray(carts)) {
        for (const cart of carts) {
            sum += cart.total_price;
        }
        return sum
    }
}

export default calcTotalPrice;