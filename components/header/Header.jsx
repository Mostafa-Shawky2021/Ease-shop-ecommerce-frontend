import Link from 'next/link'
import { Row, Col, Container } from 'react-bootstrap'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

import { Menu } from '@root/components/menu';
import { InputWithIcon } from '@root/components/inputs'

import style from './header.module.scss';
import { useContext } from 'react';
import { CartContext } from 'context';

const Header = () => {
    const { carts } = useContext(CartContext);

    const shoppingItemCount = () => {
        let count = 0;
        for (const product of carts) {
            count += product.quantity;
        }
        return count;
    }

    return (
        <div className={`${style.header} align-items-center`}>
            <Container className={style.container}>
                <Row className="align-items-center">
                    <Col xs={12} lg={2}>
                        <div className={`${style.logo} text-center text-lg-end`}>
                            <Link href="/">NotifyShop</Link>
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
                            <Link href="/" className={`${style.actionWrapper} d-flex align-items-center`}>
                                <FavoriteBorderIcon fontSize="large" sx={{ marginLeft: '8px' }} />
                                <div className={style.actionName}>
                                    <span className={style.title}>القائمة البيضاء</span>
                                    <span className={style.subTitle}>منتجاتي المفضلة</span>
                                </div>
                                <span className={style.count}>5</span>
                            </Link>
                            <Link href="/" className={`${style.actionWrapper} d-flex align-items-center`} >
                                <LocalMallOutlinedIcon fontSize="large" sx={{ marginLeft: '8px' }} />
                                <div className={style.actionName}>
                                    <span className={style.title}>عربة التسوق</span>
                                    <span className={style.subTitle}>مشترياتي</span>
                                </div>
                                {!!(carts.length > 0) && <span className={style.count}>{shoppingItemCount()}</span>}
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
            {/* <Menu /> */}
        </div>
    )
}

export default Header