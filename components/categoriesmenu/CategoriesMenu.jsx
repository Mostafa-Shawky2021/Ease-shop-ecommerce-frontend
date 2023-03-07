import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import { Button } from 'react-bootstrap';
import { ListItem } from '@root/components/listitem';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import style from './categoriesmenu.module.scss';

const CategoriesMenu = ({ categoriesData }) => {

    const [categoryListIsOpen, setCategoryListIsOpen] = useState(false);

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

    return (
        <div className={style.categoryWrapperMenu} ref={refCategoryMenu}>
            <Button
                className={style.buttonCategories}
                onClick={() => setCategoryListIsOpen(!categoryListIsOpen)}>
                <span className={style.text}>جميع الاقسام</span>
                <div className={style.barIconWrapper}>
                    <span className={style.barIcon}></span>
                    <span className={style.barIcon}></span>
                    <span className={style.barIcon}></span>
                </div>
            </Button>
            {categoriesData &&
                <ul
                    className={`${style.listCategories} ${categoryListIsOpen ? style.openCategoryList : ''}  list-unstyled`}>
                    {categoriesData?.map((category) =>
                        <li
                            key={category.id}
                            className={style.itemCategory}
                            onClick={() => setCategoryListIsOpen(false)}
                        >
                            <Link className={style.categoryLink} href={`/categoryproducts/${category.cat_slug}`}>
                                {category.cat_name}
                            </Link>
                        </li>
                    )}
                </ul>
            }
        </div>
    )

}

export default CategoriesMenu;