import Image from 'next/image';
import Link from 'next/link';

import { url } from 'data';

import DefaultImage from '@assets/images/default/default.jpg';

import style from './categoryitem.module.scss';

const CategoryItem = ({ categoryData }) => {
    const categoryImage = categoryData?.image
        ? `${url}/${categoryData.image}`
        : DefaultImage
    return (
        <div className={`${style.categoryItemWrapper} text-center`}>
            <div className={style.imageWrapper}>
                <Image
                    fill
                    className='img-fluid'
                    src={categoryImage}
                    alt={categoryData.cat_name} />
            </div>
            <div className={style.catName}>
                <Link href={`/categoryproducts/${categoryData.cat_slug}`} >{categoryData.cat_name}</Link>
            </div>
            <div className={style.productsCount}>{categoryData.products_count} منتج</div>
        </div>
    )
}
export default CategoryItem;