import Link from 'next/link'
import React from 'react'
import { Container } from 'react-bootstrap'
import style from './menu.module.scss'

const Menu = () => {
    return (
        <div className={style.menuWrapper}>
            <Container>
                <ul className="align-items-center d-flex list-unstyled p-0 m-0">
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
                        <Link href="#">التواصل معنا</Link>
                    </li>
                </ul>
            </Container>
        </div>
    )
}
export default Menu