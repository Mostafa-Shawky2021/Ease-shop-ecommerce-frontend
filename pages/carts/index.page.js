import { Row, Col, Container } from 'react-bootstrap';
import { CartList } from './components/cartlist';

const CartsPage = () => {
    return (
        <Container fluid="lg">
            <Row>
                <Col xs={12} md={7}>
                    <CartList />
                </Col>
                <Col xs={12} md={5}>

                </Col>
            </Row>
        </Container>
    )
}
export default CartsPage;