
import React, { useState, useContext, useRef } from 'react';
import Link from 'next/link'


import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

import { Row, Col, Container, Button } from 'react-bootstrap'
import { Menu } from '@root/components/menu';
import { InputWithIcon } from '@root/components/inputs'

import { CartContext } from 'context';
import { CartList } from '@root/components/cartlist';

import style from './header.module.scss';
import { useEffect } from 'react';

const Header = ({ menu }) => {
    const [isFixedHeader, setIsFixedHeader] = useState(false);
    const [isOpenCartList, setIsOpenCartList] = useState(false)

    const headerRef = useRef();


    const { carts } = useContext(CartContext);


    useEffect(() => {
        console.log('from header comp');
        const headerHeight = headerRef.current.clientHeight;
        window.addEventListener('scroll', () => {
            let scrollValue = document.documentElement.scrollTop;

            scrollValue > 400 ? setIsFixedHeader(true) : setIsFixedHeader(false);
        })
    }, [])
    const shoppingItemCount = () => {
        let count = 0;
        for (const product of carts) {
            count += product.quantity;
        }
        return count;
    }

    return (
        <div
            className={`${style.header} ${isFixedHeader ? style.fixed : ''} align-items-center`}
            ref={headerRef}
        >

            <Container className={style.container}>
                <Row className="align-items-center">
                    <Col xs={12} lg={2}>
                        <div className={`${style.logo} text-center text-lg-end`}>
                            <Link href="/homepage">Notify<span className={style.special}>Shop</span></Link>
                        </div>
                    </Col>
                    <Col xs={12} lg={6}>
                        <div>
                            <InputWithIcon placeholder="عن ماذا تبحث؟" className={style.searchInput}>
                                <button className={style.btnSearch}>
                                    <SearchOutlinedIcon />
                                </button>
                            </InputWithIcon>
                        </div>
                    </Col>
                    <Col xs={12} lg={4}>
                        <div className="d-flex align-items-center my-3 my-lg-0">
                            <Link href="#" className={`${style.actionWrapper} d-flex align-items-center`}>
                                <FavoriteBorderIcon fontSize="large" sx={{ marginLeft: '8px' }} />
                                <div className={style.actionName}>
                                    <span className={style.title}>القائمة البيضاء</span>
                                    <span className={style.subTitle}>منتجاتي المفضلة</span>
                                </div>
                                <span className={style.count}>5</span>
                            </Link>
                            <Button
                                className={`${style.actionWrapper} d-flex align-items-center text-end`}
                                onClick={() => setIsOpenCartList(!isOpenCartList)}
                            >
                                <LocalMallOutlinedIcon fontSize="large" sx={{ marginLeft: '8px' }} />
                                <div className={style.actionName}>
                                    <span className={style.title}>عربة التسوق</span>
                                    <span className={style.subTitle}>مشترياتي</span>
                                </div>
                                {!!(carts.length > 0) && <span className={style.count}>{shoppingItemCount()}</span>}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
            {menu}
            <CartList isOpenCartList={isOpenCartList} setIsOpenCartList={setIsOpenCartList} />
        </div>
    )
}

export default Header