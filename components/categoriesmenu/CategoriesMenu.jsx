import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';


import { useCategoriesData } from '@root/hooks';

import { Button } from 'react-bootstrap';
import { SubMenuCategories } from './submenucategories';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import Icon from '@assets/images/categoriesmenu/icon.png';

import style from './categoriesmenu.module.scss';

const CategoriesMenu = ({ categoriesData }) => {

    const [categoryListIsOpen, setCategoryListIsOpen] = useState(false);

    const [activeSubMenu, setActiveSubMenu] = useState(0);

    const { data: categories } = useCategoriesData();

    const refCategoryMenu = useRef(null);

    useEffect(() => {

        const closeCategoryListMenuListOnPressEscape = (event) => {
            if (event.key === 'Escape') {
                setCategoryListIsOpen(false);
            }
        };
        const closeCategoryListMenuListOnMouseClick = (event) => {
            if (refCategoryMenu.current.contains(event.target)) {
                return;
            }
            setCategoryListIsOpen(false);
        }

        document.addEventListener('keydown', closeCategoryListMenuListOnPressEscape);
        document.addEventListener('click', closeCategoryListMenuListOnMouseClick);


        return () => {
            document.removeEventListener('keydown', closeCategoryListMenuListOnPressEscape);
            document.removeEventListener('click', closeCategoryListMenuListOnMouseClick);

        }

    }, [])

    const handleMouseMoveSubMenu = (event) => {

        const activeSubMenu = event.currentTarget.getAttribute('data-active-submenu');
        setActiveSubMenu(activeSubMenu);
    }

    return (
        <div className={style.categoryWrapperMenu} ref={refCategoryMenu}>
            <Button
                className={style.buttonCategories}
                onClick={() => setCategoryListIsOpen(!categoryListIsOpen)}>
                <div className={`${style.barIconWrapper} ${categoryListIsOpen ? style.activeButton : ''}`}>
                    <span className={style.barIcon}></span>
                    <span className={style.barIcon}></span>
                    <span className={style.barIcon}></span>
                </div>
                <span className={style.text}>جميع الاقسام</span>
                <span className="ms-auto">
                    <KeyboardArrowDownIcon fontSize="small" />
                </span>
            </Button>
            {!!categories?.data ?
                <ul
                    className={`${style.listCategories} ${categoryListIsOpen ? style.openCategoryList : ''}  list-unstyled`}>
                    {categories?.data?.map((category) =>
                        <li
                            key={category.id}
                            className={style.itemCategory}
                            onClick={() => setCategoryListIsOpen(false)}
                            onMouseMove={handleMouseMoveSubMenu}
                            onMouseOut={() => setActiveSubMenu(0)}
                            data-active-submenu={category.id}>

                            <Link
                                className={style.categoryLink}
                                href={`/categoryproducts/${category.cat_slug}`}>

                                <Image
                                    width={17}
                                    height={17}
                                    src={Icon} />
                                <span className="ms-2">{category.cat_name}</span>
                            </Link>
                            {!!category.sub_categories.length &&
                                <SubMenuCategories
                                    parentCategory={category.id}
                                    activeSubMenu={activeSubMenu}
                                    subCateogiresData={category.sub_categories} />
                            }
                        </li>
                    )}
                </ul> :
                <p>لا توجد اقسام</p>
            }
        </div>
    )

}

export default CategoriesMenu;