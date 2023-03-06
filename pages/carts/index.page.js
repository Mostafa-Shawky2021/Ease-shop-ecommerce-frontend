import { Row, Col, Container, Breadcrumb } from 'react-bootstrap';
import { CartListTable } from './components/cartlisttable';
import { CartTotal } from './components/carttotal';
import { ToastContainer } from 'react-toastify';
import { BreadCrumbLayout } from '@root/components/layout';

const CartsPage = () => {
    return (
        <>
            <BreadCrumbLayout>
                <Breadcrumb.Item href="/homepage">الصفحة الرئيسية</Breadcrumb.Item>
                <Breadcrumb.Item active style={{ color: 'var(--bs-primary)', fontWeight: '500' }}>
                    سلة المشتريات
                </Breadcrumb.Item>
            </BreadCrumbLayout>
            <Container fluid="lg" style={{ marginTop: '2.5rem' }}>
                <Row>
                    <Col xs={12}>
                        <CartListTable />
                    </Col>
                    <Col xs={12} sm={4}>
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
        </>
    )
}
export default CartsPage;