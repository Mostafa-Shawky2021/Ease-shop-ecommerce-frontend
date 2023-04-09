import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { Container } from 'react-bootstrap';
import { CategoriesMenu } from './categoriesmenu';
import { BarIcon } from '@root/components/baricon';

import style from './menu.module.scss';

const Menu = ({ sidebarMenuMobileIsOpen, setSidebarMenuMobileIsOpen, }) => {

    const [fixedMenu, setFixedMenu] = useState(false);

    useEffect(() => {

        window.addEventListener('scroll', () => {
            let scrollValue = document.documentElement.scrollTop;
            (scrollValue > 400) ? setFixedMenu(true) : setFixedMenu(false);
        })

    }, [setFixedMenu])

    return (
        <div className={`${style.menuWrapper} ${fixedMenu ? style.fixed : ''}`}>
            <Container fluid="xl" className="d-flex align-items-center px-1">
                <div className={style.categoryWrapper}>
                    <CategoriesMenu />
                </div>
                <ul className={`${style.listMenu} list-unstyled`}>
                    <li className={style.item}>
                        <Link href="/homepage">الصفحة الرئيسية</Link>
                    </li>
                    <li className={style.item}>
                        <Link href="/productsoffers">العروض المميزة</Link>
                    </li>
                    <li className={style.item}>
                        <Link href="#">الطلبات</Link>
                    </li>
                    <li className={style.item}>
                        <Link href="/store">المتجر</Link>
                    </li>
                    <li className={style.item}>
                        <Link href="#">التواصل معنا</Link>
                    </li>
                </ul>

                {/* display in mobile screen  */}
                <div className={style.mobileWrapper}>
                    <div className={`${style.logoMobileScreen}`}>
                        <Link href="/homepage" className={style.logo}>
                            Notify
                            <span className={style.special}>
                                Shop
                            </span>
                        </Link>
                    </div>
                    <div className={style.barWrapper}>
                        <BarIcon
                            activeIcons={sidebarMenuMobileIsOpen ? true : false}
                            style={{ width: '20px', color: "#000" }}
                            onClick={() => setSidebarMenuMobileIsOpen(!sidebarMenuMobileIsOpen)}
                            barIconStyle={style.barIcon} />
                    </div>
                </div>
            </Container>
        </div>
    )
}
export default Menu