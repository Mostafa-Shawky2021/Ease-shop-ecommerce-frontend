function calcCateogoryProductsCount(category) {
  let productsCount = category?.products_count;
  let subCategories = category?.sub_categories;
  if (subCategories?.length) {
    for (const subCategory of subCategories)
      productsCount += subCategory.products_count;
  }
  return productsCount;
}

export default calcCateogoryProductsCount;
