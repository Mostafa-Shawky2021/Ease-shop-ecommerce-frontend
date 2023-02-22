
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link'

import { useRouter } from 'next/router';
import { useCartsData, useGuest } from '@root/hooks';

import { calcCartsCount } from '@root/utils';

import { Row, Col, Container, Button } from 'react-bootstrap';
import { InputWithIcon } from '@root/components/inputs';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

import style from './header.module.scss';


const Header = ({ setIsOpenCartList }) => {

    const [searchInput, setSearchInput] = useState('');

    const inputRef = useRef(null);

    const router = useRouter()
    const { guestId } = useGuest();

    const { data: carts } = useCartsData(guestId);

    const handleSearchInput = () => {
        const searchInputUrl = encodeURIComponent(searchInput);
        router.push(`/products?productname=${searchInputUrl}`, undefined, { shallow: true });
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            const searchInputUrl = encodeURIComponent(searchInput);
            router.push(`/products?productname=${searchInputUrl}`, undefined, { shallow: true });

        }
    };
    return (
        <div className={`${style.header} align-items-center`}>

            <Container fluid="xl" className={style.container}>
                <Row className="align-items-center">
                    <Col xs={12} md={3} lg={2}>
                        <div className={`${style.logo} text-center text-lg-end`}>
                            <Link href="/homepage">Notify<span className={style.special}>Shop</span></Link>
                        </div>
                    </Col>
                    <Col xs={12} md={6} lg={6}>
                        <div>
                            <InputWithIcon
                                onChange={(event) => setSearchInput(event.target.value)}
                                placeholder="عن ماذا تبحث؟"
                                className={style.searchInput}
                                ref={inputRef}
                                onKeyPress={handleKeyPress}
                            >
                                <button className={style.btnSearch} onClick={handleSearchInput}>
                                    <SearchOutlinedIcon />
                                </button>
                            </InputWithIcon>
                        </div>
                    </Col>
                    <Col xs={12} md={3} lg={4}>
                        <div className="d-flex flex-wrap align-items-center my-3 my-lg-0">
                            <Link href="#" className={`${style.actionWrapper} d-flex align-items-center `}>
                                <FavoriteBorderIcon fontSize="large" sx={{ marginRight: '8px' }} />
                                <div className={style.actionName}>
                                    <span className={style.title}>القائمة البيضاء</span>
                                    <span className={style.subTitle}>منتجاتي المفضلة</span>
                                </div>
                                <span className={style.count}>5</span>
                            </Link>
                            <Button
                                className={`${style.actionWrapper} d-flex align-items-center text-start`}
                                onClick={() => setIsOpenCartList((prevIsOpenCartList) => !prevIsOpenCartList)}
                            >
                                <LocalMallOutlinedIcon
                                    fontSize="large"
                                />
                                <div className={style.actionName}>
                                    <span className={style.title}>عربة التسوق</span>
                                    <span className={style.subTitle}>مشترياتي</span>
                                </div>
                                {!!(carts?.length) && <span className={style.count}>{calcCartsCount(carts)}</span>}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default Header