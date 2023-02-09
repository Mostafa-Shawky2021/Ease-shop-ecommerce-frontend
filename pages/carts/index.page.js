import { Row, Col, Container } from 'react-bootstrap';
import { CartList } from './components/cartlist';
import { CartTotal } from './components/carttotal';

const CartsPage = () => {
    return (
        <Container fluid="lg" style={{ marginTop: '2.5rem' }}>
            <Row>
                <Col xs={12} md={7}>
                    <CartList />
                </Col>
                <Col xs={12} md={4}>
                    <CartTotal />
                </Col>
            </Row>
        </Container>
    )
}
export default CartsPage;