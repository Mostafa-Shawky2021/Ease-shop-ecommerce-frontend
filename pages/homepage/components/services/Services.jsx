import { Container, Row, Col } from 'react-bootstrap'
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import style from './services.module.scss'

function Services() {
    return (
        <div className={style.services} >
            <Container>
                <Row>
                    <Col xs={6} md={4} className="my-3 my-lg-0">
                        <div className="text-center">
                            <DeliveryDiningOutlinedIcon className={style.serviceIcon} />
                            <div className={style.serviceWrapper}>
                                <p className={style.title}>اسرع خدمة توصيل</p>
                                <p className={`${style.subTitle} `}>احصل علي شحن سريع وأمن من خلال افضل شركات الشحن في مصر</p>
                            </div>
                        </div>
                    </Col>
                    <Col xs={6} md={4} className="my-3 my-lg-0">
                        <div className="text-center">
                            <SupportAgentOutlinedIcon className={style.serviceIcon} />
                            <div className={style.serviceWrapper}>
                                <p className={style.title}>خدمة عملاء مميزة</p>
                                <p className={`${style.subTitle}`}>نوفر خدمة عملاء علي أعلي مستوي وهدفنا الأول رضاء العملاء</p>
                            </div>
                        </div>
                    </Col>
                    <Col xs={6} md={4} className="my-3 my-lg-0">
                        <div className="text-center">
                            <PublishedWithChangesOutlinedIcon className={style.serviceIcon} />
                            <div className={style.serviceWrapper}>
                                <p className={style.title}>استبدال واسترجاع المنتج</p>
                                <p className={style.subTitle}>نوفر لك استبدال واسترجاع مجاني لعيوب الصناعة والغير مطابق للعروض</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container >
        </div>
    )
}

export default Services