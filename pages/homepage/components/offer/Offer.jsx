import Link from 'next/link';
import { Button, Container, Row, Col } from 'react-bootstrap';
import style from './offer.module.scss';

const Offer = () => {
    return (
        <div className={style.offerWrapper}>
            <Container fluid="lg">
                <Row>
                    <Col xs={12} md={6}>
                        <div className={`${style.banner} ${style.firstBanner}`}>
                            <div className={style.intro}>
                                <h3 className={style.title}>منتجات  الموسم الجديد</h3>
                                <p className={style.description}>خصومات تصل الي <span className={style.offer}>40%</span></p>
                                <Link href="/productsoffers" className={style.shopNow}>
                                    <span className={style.text}>تسوق الأن</span>
                                </Link>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className={`${style.banner} ${style.secondBanner}`}>
                            <div className={style.intro}>
                                <h3 className={style.title}>افضل تشكيلات للملابس</h3>
                                <p className={style.description}>افضل المنتجات باسعار مناسبة</p>
                                <Link href="/store" className={style.shopNow}>
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