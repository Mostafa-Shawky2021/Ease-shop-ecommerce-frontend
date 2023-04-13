import Link from 'next/link';
import Image from 'next/image';

import { url } from 'data';

import Icon from '@assets/images/categoriesmenu/icon.png';

import style from './submenucategories.module.scss';

const SubMenuCategories = ({ className, subCateogiresData }) => {

    return (
        <ul
            className={`${style.defaultListSubCategories} ${className} list-unstyled`}>
            {subCateogiresData.map(subCategory => {
                console.log(subCategory)
                const imageIcon = subCategory?.image_thumbnail
                    ? `${url}/${subCategory?.image_thumbnail?.url}`
                    : Icon;

                return <li key={subCategory.id} className={style.itemCategory}>
                    <Link className={style.link}
                        href={`/categoryproducts/${subCategory.cat_slug}`}>
                        <Image
                            width={17}
                            height={17}
                            src={imageIcon}
                            alt={subCategory.cat_name} />
                        {subCategory.cat_name}
                    </Link>
                </li>
            }

            )}
        </ul>
    )
}
export default SubMenuCategories;