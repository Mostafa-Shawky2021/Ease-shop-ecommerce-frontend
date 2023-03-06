import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { Button } from 'react-bootstrap';
import { ListItem } from '@root/components/listitem';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import style from './categoriesmenu.module.scss';

const CategoriesMenu = ({ categoriesData }) => {

    const [categoryListIsOpen, setCategoryListIsOpen] = useState(false);



    useEffect(() => {

        const closeCategoryListMenuList = (event) => {
            if (event.key === 'Escape') {
                setCategoryListIsOpen(false);
            }
        };
        document.addEventListener('keydown', closeCategoryListMenuList);

        document.body.addEventListener('click', function () {

        })

        return () => document.removeEventListener('keydown', closeCategoryListMenuList);

    }, [])

    return (
        <div className={style.categoryWrapperMenu}>
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
                <ul className={`${style.listCategories} ${categoryListIsOpen ? style.openCategoryList : ''}  list-unstyled`}>
                    {categoriesData?.map((category) => (
                        <li key={category.id} className={style.itemCategory}>
                            <Link className={style.categoryLink} href={`/categoryproducts/${category.cat_slug}`}>
                                {category.cat_name}
                            </Link>
                        </li>
                    ))}
                </ul>
            }
        </div>
    )

}

export default CategoriesMenu;