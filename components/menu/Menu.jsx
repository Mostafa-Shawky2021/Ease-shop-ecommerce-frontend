import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';

import { Button, Container } from 'react-bootstrap';
import { ListItem } from '@root/components/listitem';

import DehazeIcon from '@mui/icons-material/Dehaze';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import style from './menu.module.scss';
import { CartContext } from 'context';
import { calcCartsCount } from 'utils';

const Menu = ({ categoriesData, setIsOpenCartList }) => {

    const [categoryListIsOpen, setCategoryListIsOpen] = useState(false)
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
    const [fixedMenu, setFixedMenu] = useState(false);

    const { carts } = useContext(CartContext);

    useEffect(() => {
        const closeCategoryListMenuList = (event) => {
            if (event.key === 'Escape') {
                setCategoryListIsOpen(false);
                setMobileMenuIsOpen(false);
            }
        };

        document.addEventListener('keydown', closeCategoryListMenuList);
        return () => document.removeEventListener('keydown', closeCategoryListMenuList);
    }, [])

    useEffect(() => {
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
    }, [])

    useEffect(() => {

        window.addEventListener('scroll', () => {
            let scrollValue = document.documentElement.scrollTop;
            (scrollValue > 400) ? setFixedMenu(true) : setFixedMenu(false);
        })

    }, [setFixedMenu])
    return (
        <div className={`${style.menuWrapper} ${fixedMenu ? style.fixed : ''}`}>
            <Container fluid="xl" className="d-flex align-items-center">
                <div className={style.categoryWrapper}>
                    <Button
                        className={style.buttonCategories}
                        onClick={() => setCategoryListIsOpen(!categoryListIsOpen)}
                    >
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
                </div>

                <ul className={`${style.listMenu} ${mobileMenuIsOpen ? style.openMenuMobile : ''} list-unstyled`}>
                    <li
                        className={style.iconMenuMobileCloseWrapper}
                        onClick={() => setMobileMenuIsOpen(false)}>
                        <CloseIcon fontSize="small" className={style.icon} />
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
                {fixedMenu && (
                    <Button className={style.cartListBtn} onClick={() => setIsOpenCartList((prevOpenCartList) => !prevOpenCartList)}>
                        {!!carts.length && (<span className={style.cartCount}>{calcCartsCount(carts)}</span>)}
                        <ShoppingCartOutlinedIcon fontSize="medium" />
                    </Button>
                )}

                {/* display in mobile screen  */}
                <div className={style.iconMobileWrapper} onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}>
                    <DehazeIcon fontSize="large" />
                </div>
            </Container>
        </div>
    )
}
export default Menu