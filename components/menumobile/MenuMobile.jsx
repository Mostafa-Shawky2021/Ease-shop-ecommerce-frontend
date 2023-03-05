import Link from 'next/link';

import { useGuest, useCartsData } from '@root/hooks';

import { calcCartsCount } from '@root/utils';

import { Container } from 'react-bootstrap';

import HomeIcon from '@mui/icons-material/Home';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StoreIcon from '@mui/icons-material/Store';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import style from './menumobile.module.scss';

const MenuMobile = () => {

    const { guestId } = useGuest()
    const { data: carts } = useCartsData(guestId);

    return (
        <div className={style.menuMobileWrapper}>
            <Container fluid>
                <ul className={`${style.menuList} list-unstyled`}>
                    <li className={style.menuItem}>
                        <Link href="/homepage">
                            <span className={style.icon}>
                                <HomeIcon />
                            </span>
                            <span className={style.text}>الصفحة الرئيسية</span>
                        </Link>
                    </li>
                    <li className={style.menuItem}>
                        <Link href="/productsoffers">
                            <span className={style.icon}>
                                <LocalOfferIcon />
                            </span>
                            <span className={style.text}>العروض المميزة</span>
                        </Link>
                    </li>
                    <li className={style.menuItem}>
                        <Link href="/store">
                            <span className={style.icon}>
                                <StoreIcon />
                            </span>
                            <span className={style.text}>المتجر</span>
                        </Link>
                    </li>

                    <li className={style.menuItem}>
                        <Link href="/carts">
                            <span className={style.icon}>
                                <ShoppingCartIcon />
                            </span>
                            <span className={style.text}>
                                المشتريات
                                {!!(carts?.length) && <span className={style.count}>{calcCartsCount(carts)}</span>}
                            </span>

                        </Link>
                    </li>
                    <li className={style.menuItem}>
                        <Link href="">
                            <span className={style.icon}>
                                <HeadsetMicIcon />
                            </span>
                            <span className={style.text}>التواصل معنا</span>
                        </Link>
                    </li>

                </ul>
            </Container>
        </div >
    )
}

export default MenuMobile