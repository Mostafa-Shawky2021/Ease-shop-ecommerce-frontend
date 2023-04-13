
import Link from 'next/link';

import { CategoriesMenuMobile } from './categoriesmenumobile';

import CloseIcon from '@mui/icons-material/Close';

import style from './sidebarmenumobile.module.scss';

const SideBarMenuMobile = ({ sidebarMenuMobileIsOpen, setSidebarMenuMobileIsOpen }) => {

    const sideBarMenuMobileIsOpenClass = sidebarMenuMobileIsOpen ? style.openSidebarMenuMobile : '';

    return (
        <div className={`${style.sidebarListMenu} ${sideBarMenuMobileIsOpenClass}`}>
            <div
                className={style.iconMenuMobileCloseWrapper}
                onClick={() => setSidebarMenuMobileIsOpen(false)}>
                <CloseIcon
                    fontSize="small"
                    className={style.icon} />
            </div>
            <div className={`${style.categoriesWrapper} ${style.item}`} >
                <CategoriesMenuMobile />
            </div>
            <ul className={`${style.listMenu} list-unstyled`}>
                <li className={style.item}>
                    <Link href="/homepage">الصفحة الرئيسية</Link>
                </li>
                <li className={style.item}>
                    <Link href="/productsoffers">العروض المميزة</Link>
                </li>
                <li className={style.item}>
                    <Link href="/categories">الاقسام</Link>
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
        </div>
    )
}

export default SideBarMenuMobile;