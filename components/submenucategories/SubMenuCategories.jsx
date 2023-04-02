import Link from 'next/link';
import Image from 'next/image';

import Icon from '@assets/images/categoriesmenu/icon.png';

import style from './submenucategories.module.scss';

const SubMenuCategories = ({ className, subCateogiresData }) => {

    return (
        <ul
            className={`${style.defaultListSubCategories} ${className} list-unstyled`}>
            {subCateogiresData.map(subCategory =>
                <li className={style.itemCategory}>
                    <Link className={style.link}
                        href={`/categoryproducts/${subCategory.cat_slug}`}>
                        <Image
                            width={17}
                            height={17}
                            src={Icon} />
                        {subCategory.cat_name}
                    </Link>
                </li>
            )}
        </ul>
    )
}
export default SubMenuCategories;