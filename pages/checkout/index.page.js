import { Container, Row, Col } from 'react-bootstrap';
import { CheckOutForm } from './components/checkoutform';
import { ProductsOrder } from './components/productsorder';

const CheckOutPage = () => {
    return (
        <Container fluid="lg" style={{ marginTop: '2.5rem' }}>
            <Row>
                <Col xs={12} md={6}>
                    <CheckOutForm />
                </Col>
                <Col xs={12} md={6}>
                    <ProductsOrder />
                </Col>
            </Row>
        </Container>
    )
}


export default CheckOutPage;