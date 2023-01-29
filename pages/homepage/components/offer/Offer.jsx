import { Button, Container } from 'react-bootstrap';
import style from './offer.module.scss';
const Offer = () => {
    return (
        <div className={style.offerWrapper}>
            <Container fluid="lg">
                <div style={{ marginRight: '50px' }}>
                    <p className={style.offer}>
                        50% خصم
                    </p>
                    <Button className={style.more}>اكتشف المزيد</Button>

                </div>
            </Container>

        </div>
    )
}

export default Offer;