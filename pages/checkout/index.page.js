import { useGuest, useCartsData } from '@root/hooks';

import { Container, Row, Col } from 'react-bootstrap';
import { Seek } from 'react-loading-indicators';
import { Loading } from '@root/components/loading';
import { CheckOutForm } from './components/checkoutform';
import { ProductsOrder } from './components/productsorder';

const CheckOutPage = () => {

    const { guestId } = useGuest();
    const { data: carts, isLoading } = useCartsData(guestId);

    return (
        <Container fluid="lg" style={{ marginTop: '2.5rem', paddingTop: '2rem', position: 'relative', background: '#fff' }}>
            {isLoading
                ? <div style={{ height: '700px', position: 'relative' }}>
                    <Loading isOpacity={false}>
                        <Seek
                            style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%)' }}
                            color="#ffb700" size="medium" text="" textColor=""
                        />
                    </Loading>
                </div>
                : !!carts.length
                    ? <Row>
                        <Col xs={12} md={6}>
                            <CheckOutForm />
                        </Col>
                        <Col xs={12} md={6}>
                            <ProductsOrder />
                        </Col>
                    </Row>
                    : <p> لا يوجد طلبات لعرضها</p>}
        </Container >
    )
}


export default CheckOutPage;