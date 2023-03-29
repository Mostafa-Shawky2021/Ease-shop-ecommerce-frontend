import Link from 'next/link';
import Image from 'next/image';

import Icon from '@assets/images/categoriesmenu/icon.png';

import style from './submenucategories.module.scss';

const SubMenuCategories = ({ parentCategory, activeSubMenu, subCateogiresData }) => {

    const activeSubMenuClass = parentCategory === Number(activeSubMenu) ? style.activeSubMenu : 'k';

    return (
        <ul
            className={`${style.listSubCategories} ${activeSubMenuClass} list-unstyled`}>
            {subCateogiresData.map(subCategory =>
                <li className={style.itemCategory}>
                    <Link className={style.link} href="#">
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