import Link from 'next/link';
import Image from 'next/image';

import { Container, Row, Col } from 'react-bootstrap';

import FirstImage from '@assets/images/topcategories/img1.jpg';
import SecondImage from '@assets/images/topcategories/img2.jpg';

import style from './offer.module.scss';

const Offer = () => {
    return (
        <div className={style.offerWrapper}>
            <Container fluid="xxl" style={{ padding: '0px' }}>
                <Row className="g-0">
                    <Col xs={12} md={6}>
                        <div className={style.banner}>
                            <div className={style.imageBox}>
                                <Image
                                    src={SecondImage}
                                    alt="top-category"
                                    fill
                                    style={{ objectFit: 'cover' }} />
                            </div>
                            <div className={style.intro}>
                                <h3 className={style.title}>افضل تشكيلات للملابس</h3>
                                <p className={style.description}>افضل المنتجات باسعار مناسبة</p>
                                <Link href="/store" className={style.shopNow}>
                                    <span className={style.text}>تسوق الأن</span>
                                </Link>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className={style.banner}>
                            <div className={style.imageBox}>
                                <Image
                                    src={FirstImage}
                                    alt="top-category"
                                    fill
                                    style={{ objectFit: 'cover' }} />
                            </div>
                            <div className={style.intro}>
                                <h3 className={style.title}>منتجات  الموسم الجديد</h3>
                                <p className={style.description}>خصومات تصل الي <span className={style.offer}>40%</span></p>
                                <Link href="/productsoffers" className={style.shopNow}>
                                    <span className={style.text}>تسوق الأن</span>
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default Offer;