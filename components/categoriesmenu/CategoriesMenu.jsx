import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { Button } from 'react-bootstrap';
import { ListItem } from '@root/components/listitem';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import style from './categoriesmenu.module.scss';

const CategoriesMenu = ({ categoriesData }) => {

    const [categoryListIsOpen, setCategoryListIsOpen] = useState(false);

    useEffect(() => {

        const collapsesButton = Array.from(document.getElementsByClassName('collapses-button'));

        collapsesButton.forEach(collapseButton => {

            collapseButton.addEventListener('click', function () {

                const subCategory = this.nextElementSibling;
                const chevronIcon = this.children[0];

                if (subCategory && chevronIcon) {

                    chevronIcon.style.transform = 'rotate(-90deg)';
                    subCategory.classList.toggle('open');

                    if (subCategory.classList.contains('open')) {
                        subCategory.style.height = `${subCategory.scrollHeight}px`;

                    } else {
                        chevronIcon.style.transform = 'rotate(0deg)';
                        subCategory.style.height = '0px'
                    }
                }

            })
        })

    }, [categoriesData])

    useEffect(() => {

        const closeCategoryListMenuList = (event) => {
            if (event.key === 'Escape') {
                setCategoryListIsOpen(false);
            }
        };
        document.addEventListener('keydown', closeCategoryListMenuList);
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
            {categoriesData && (
                <ul className={`${style.listCategories} ${categoryListIsOpen ? style.openCategoryList : ''}  list-unstyled`}>
                    <ListItem
                        data={categoriesData}
                        renderItem={(category) => (
                            <li key={category.id} className={style.itemCategory}>
                                {!!category.sub_categories.length ? (<>
                                    <Button className={`${style.collapseButton} collapses-button`} >
                                        {category.cat_name}
                                        <ChevronLeftIcon className={style.subCategoriesIcon} fontSize="small" />
                                    </Button>
                                    <ul className={`${style.listSubCategories} list-unstyled`}>
                                        <li className={style.subcategoryItem}>
                                            <Link href={`/categoryproducts/${category.cat_slug}`}>
                                                {category.cat_name}
                                            </Link>
                                        </li>
                                        {category.sub_categories.map(subCateogry => (
                                            <li className={style.subcategoryItem} key={subCateogry.id}>
                                                <Link href={`/categoryproducts/${subCateogry.cat_slug}`}>
                                                    {subCateogry.cat_name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </>) :
                                    (<Link className={style.categoryLink} href={`/categoryproducts/${category.cat_slug}`}>
                                        {category.cat_name}
                                    </Link>)}
                            </li>
                        )} />
                </ul>
            )
            }
        </div>
    )

}

export default CategoriesMenu;