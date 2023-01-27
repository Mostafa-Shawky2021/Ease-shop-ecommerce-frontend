import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { Button, Container } from 'react-bootstrap';
import { ListItem } from '@root/components/listitem';
import style from './menu.module.scss';

const Menu = ({ categoriesData }) => {
    const [categoryListIsOpen, setCategoryListIsOpen] = useState(false)

    useEffect(() => {
        const closeCategoryList = (event) => event.key === 'Escape' ? setCategoryListIsOpen(false) : '';
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
                                        <li key={category.id} className={style.item}>{category.cat_name}</li>
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