function calcPriceDiscount(oldPrice, priceAfterDiscount) {
    const subtractionResult = oldPrice - priceAfterDiscount;
    const discountPercentage = (subtractionResult / oldPrice) * 100
    return discountPercentage;

}
export default calcPriceDiscount