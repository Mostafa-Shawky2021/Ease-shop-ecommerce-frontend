import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { url } from 'data';

import { SubMenuCategories } from '@root/components/submenucategories';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import DefaultImage from '@assets/images/default/default.jpg';

import style from './categoryitem.module.scss';

const CategoryItem = ({ categoryData, subMenuCategories, ...props }) => {

    const [activeSubMenu, setActiveSubMenu] = useState(0);

    const handleMouseMoveSubMenu = (event) => {

        const activeSubMenu = event.currentTarget.getAttribute('data-active-submenu');
        setActiveSubMenu(activeSubMenu);
    }

    const activeSubMenuClass = categoryData.id === Number(activeSubMenu)
        ? `${style.activeSubMenu} ${style.display}`
        : style.hide;

    const imageIcon = categoryData?.image_thumbnail
        ? categoryData?.image_thumbnail
        : DefaultImage;

    return (
        <li
            className={style.itemCategory}
            data-active-submenu={categoryData.id}
            onMouseMove={handleMouseMoveSubMenu}
            onMouseOut={() => setActiveSubMenu(0)}
            {...props}>
            <Link
                className={style.categoryLink}
                href={`/categoryproducts/${categoryData.cat_slug}`}>
                <Image
                    width={20}
                    height={20}
                    src={imageIcon}
                    alt={categoryData.cat_slug} />
                <span className="ms-2">{categoryData.cat_name}</span>
                {!!categoryData.sub_categories.length &&
                    <span className="ms-auto">
                        <ChevronLeftIcon fontSize="small" />
                    </span>
                }
            </Link>
            {!!categoryData.sub_categories.length &&
                <SubMenuCategories
                    className={`${style.listSubCategories} ${activeSubMenuClass}`}
                    subCateogiresData={categoryData.sub_categories} />
            }

        </li>

    )
}
export default CategoryItem;