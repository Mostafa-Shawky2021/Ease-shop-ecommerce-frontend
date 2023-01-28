import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import { Button, Container } from 'react-bootstrap';
import { ListItem } from '@root/components/listitem';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import style from './menu.module.scss';

const Menu = ({ categoriesData }) => {

    const [categoryListIsOpen, setCategoryListIsOpen] = useState(false)

    useEffect(() => {

        const closeCategoryList = (event) => event.key === 'Escape' ? setCategoryListIsOpen(false) : '';
        const collapsesButton = Array.from(document.querySelectorAll('.collapses-button'));

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

        document.addEventListener('keydown', closeCategoryList);

        return () => document.removeEventListener('keydown', closeCategoryList);
    }, [])

    return (
        <div className={style.menuWrapper}>
            <Container>
                <ul className={`${style.listMenu} list-unstyled`}>
                    <li className={style.categoryWrapper}>
                        <Button className={style.buttonCategories} onClick={() => setCategoryListIsOpen(!categoryListIsOpen)}>
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
                                        <li
                                            key={category.id}
                                            className={style.item}
                                        >
                                            <Button className={`${style.collapseButton} collapses-button`} >
                                                {category.cat_name}
                                                {!!category.sub_categories.length &&
                                                    <ChevronLeftIcon
                                                        className={style.subCategoriesIcon}
                                                        fontSize="small"
                                                    />}
                                            </Button>
                                            {!!category.sub_categories.length && (
                                                <>
                                                    <ul
                                                        className={`${style.listSubCategories} list-unstyled`}

                                                    >
                                                        <ListItem
                                                            data={category.sub_categories}
                                                            renderItem={(subcategory) => (
                                                                <li className={style.subcategoryItem} key={subcategory.id}>
                                                                    <Link href="">
                                                                        {subcategory.cat_name}
                                                                    </Link>

                                                                </li>
                                                            )}
                                                        />
                                                    </ul>
                                                </>
                                            )}

                                        </li>
                                    )}
                                />
                            </ul>

                        )}
                    </li>
                    <li className={style.item}>
                        <Link href="#">الصفحة الرئيسية</Link>
                    </li>
                    <li className={style.item}>
                        <Link href="#">الاقسام</Link>
                    </li>
                    <li className={style.item}>
                        <Link href="#">الطلبات</Link>
                    </li>
                    <li className={style.item}>
                        <Link href="#">المتجر</Link>
                    </li>
                    <li className={style.item}>
                        <Link href="#">التواصل معنا</Link>
                    </li>

                </ul>
            </Container>
        </div >
    )
}
export default Menu