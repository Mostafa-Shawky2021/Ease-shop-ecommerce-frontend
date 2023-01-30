import { Button, Container } from 'react-bootstrap';
import style from './offer.module.scss';
const Offer = () => {
    return (
        <div className={style.offerWrapper}>
            <Container fluid="lg">
                <div className={style.contentWrapper}>
                    <p className={style.offer}>
                        50% خصم
                    </p>
                    <Button className={style.more}>
                        <span className={style.text}>عرض المزيد</span>
                    </Button>
                </div>
            </Container>

        </div>
    )
}

export default Offer;