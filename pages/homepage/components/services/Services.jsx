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
                <Row >
                    <Col xs={6} lg={3} className="my-3 my-lg-0">
                        <div className="d-flex">
                            <DeliveryDiningOutlinedIcon className={style.serviceIcon} />
                            <div className={style.serviceWrapper}>
                                <p className={`${style.title} m-0`}>اسرع خدمة توصيل</p>
                                <p className={`${style.subTitle} m-0`}>التوصيل يكون خلال يومين او ثلاثة</p>
                            </div>
                        </div>
                    </Col>
                    <Col xs={6} lg={3} className="my-3 my-lg-0">
                        <div className="d-flex">
                            <SupportAgentOutlinedIcon className={style.serviceIcon} />
                            <div className={style.serviceWrapper}>
                                <p className={`${style.title} m-0`}>افضل دعم اونلاين</p>
                                <p className={`${style.subTitle} m-0`}>الدعم علي مدار الاسبوع في 24 ساعه</p>
                            </div>
                        </div>
                    </Col>
                    <Col xs={6} lg={3} className="my-3 my-lg-0">
                        <div className="d-flex">
                            <PublishedWithChangesOutlinedIcon className={style.serviceIcon} />
                            <div className={style.serviceWrapper}>
                                <p className={`${style.title} m-0`}>خدمة استرجاع المنتج</p>
                                <p className={`${style.subTitle} m-0`}>يمكن استرجاع المنتج  في حالة عدم الاستعمال</p>
                            </div>
                        </div>
                    </Col>
                    <Col xs={6} lg={3} className="my-3 my-lg-0">
                        <div className="d-flex">
                            <AttachMoneyOutlinedIcon className={style.serviceIcon} />
                            <div className={style.serviceWrapper}>
                                <p className={`${style.title} m-0`}>ارخص اسعار في مصر</p>
                                <p className={`${style.subTitle} m-0`}>خصومات تصل الي 50%</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container >
        </div>
    )
}

export default Services