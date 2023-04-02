
import Link from 'next/link';

import { CategoriesMenuMobile } from './categoriesmenumobile';

import CloseIcon from '@mui/icons-material/Close';

import style from './sidebarmenumobile.module.scss';

const SideBarMenu = ({ setSidebarMenuIsOpen, sidebarMenuIsOpen }) => {

    const sideBarMenuMobileIsOpen = sidebarMenuIsOpen ? style.openSidebarMenuMobile : '';

    return (
        <div className={`${style.sidebarListMenu} ${sideBarMenuMobileIsOpen}`}>
            <div className={style.iconMenuMobileCloseWrapper} onClick={() => setSidebarMenuIsOpen(false)}>
                <CloseIcon fontSize="small" className={style.icon} />
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

export default SideBarMenu;