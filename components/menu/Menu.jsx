import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';

import { Button, Container } from 'react-bootstrap';

import DehazeIcon from '@mui/icons-material/Dehaze';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import { CartContext } from 'context';
import { calcCartsCount } from '@root/utils';
import { CategoriesMenu } from './categoriesmenu';

import style from './menu.module.scss';

const Menu = ({ categoriesData, setIsOpenCartList }) => {

    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
    const [fixedMenu, setFixedMenu] = useState(false);

    const { carts } = useContext(CartContext);

    useEffect(() => {
        const closeCategoryListMenuList = (event) => {
            if (event.key === 'Escape') {
                setMobileMenuIsOpen(false);
            }
        };
        document.addEventListener('keydown', closeCategoryListMenuList);
        return () => document.removeEventListener('keydown', closeCategoryListMenuList);
    }, [])

    useEffect(() => {

        window.addEventListener('scroll', () => {
            let scrollValue = document.documentElement.scrollTop;
            (scrollValue > 180) ? setFixedMenu(true) : setFixedMenu(false);
        })

    }, [setFixedMenu])

    return (
        <div className={`${style.menuWrapper} ${fixedMenu ? style.fixed : ''}`}>
            <Container fluid="xl" className="d-flex align-items-center">
                <div className={style.categoryWrapper}>
                    <CategoriesMenu categoriesData={categoriesData} />
                </div>
                <ul className={`${style.listMenu} ${mobileMenuIsOpen ? style.openMenuMobile : ''} list-unstyled`}>
                    <li className={style.iconMenuMobileCloseWrapper} onClick={() => setMobileMenuIsOpen(false)}>
                        <CloseIcon fontSize="small" className={style.icon} />
                    </li>
                    <li className={style.item}>
                        <Link href="/homepage">الصفحة الرئيسية</Link>
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