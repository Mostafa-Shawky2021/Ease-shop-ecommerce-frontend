import Image from "next/image";
import Link from "next/link";
import { calcCateogoryProductsCount } from "utils";

import DefaultImage from "@assets/images/default/default.jpg";

import style from "./categoryitem.module.scss";

const CategoryItem = ({ categoryData }) => {
  const categoryImage = categoryData?.image ? categoryData.image : DefaultImage;
  return (
    <div className={`${style.categoryItemWrapper} text-center`}>
      <div className={style.imageWrapper}>
        <Link href={`/categoryproducts/${categoryData?.cat_slug}`}>
          <Image
            fill
            style={{ objectFit: "contain" }}
            className="img-fluid"
            src={categoryImage}
            alt={categoryData?.cat_name}
          />
        </Link>
      </div>
      <div className={style.catName}>
        <Link href={`/categoryproducts/${categoryData?.cat_slug}`}>
          {categoryData?.cat_name}
        </Link>
      </div>
      <div className={style.productsCount}>
        {calcCateogoryProductsCount(categoryData)} منتج
      </div>
    </div>
  );
};
export default CategoryItem;
