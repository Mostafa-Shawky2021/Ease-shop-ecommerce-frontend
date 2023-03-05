import { Row, Col, Container } from 'react-bootstrap';
import { CartList } from './components/cartlist';
import { CartTotal } from './components/carttotal';
import { ToastContainer } from 'react-toastify';
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
            <ToastContainer
                position="top-center"
                autoClose={1000}
                limit={1}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="colored"
            />
        </Container>
    )
}
export default CartsPage;