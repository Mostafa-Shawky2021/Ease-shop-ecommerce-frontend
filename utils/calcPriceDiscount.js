function calcPriceDiscount(oldPrice, priceAfterDiscount) {
    const subtractionResult = oldPrice - priceAfterDiscount;
    const discountPercentage = Math.round((subtractionResult / oldPrice) * 100);
    return discountPercentage;

}
export default calcPriceDiscount