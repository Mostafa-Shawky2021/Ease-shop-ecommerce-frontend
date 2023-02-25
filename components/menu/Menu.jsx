import React, { useState, useEffect } from 'react';
import Link from 'next/link';



import { useCartsData, useGuest } from '@root/hooks';

import { calcCartsCount } from '@root/utils';

import { Button, Container } from 'react-bootstrap';
import { CategoriesMenu } from '@root/components/categoriesmenu';

import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import style from './menu.module.scss';

const Menu = ({ categoriesData, setIsOpenCartList }) => {

    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
    const [fixedMenu, setFixedMenu] = useState(false);

    const { guestId } = useGuest();

    const { data: carts } = useCartsData(guestId);

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
            (scrollValue > 400) ? setFixedMenu(true) : setFixedMenu(false);
        })

    }, [setFixedMenu])

    return (
        <div className={`${style.menuWrapper} ${fixedMenu ? style.fixed : ''}`}>
            <Container fluid="lg" className="d-flex align-items-center">
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
                        {!!carts?.length && (<span className={style.cartCount}>{calcCartsCount(carts)}</span>)}
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