import { useCartsData, useGuest } from '@root/hooks';

import { Row, Col, Container, Breadcrumb } from 'react-bootstrap';
import { CartListTable } from './components/cartlisttable';
import { CartTotal } from './components/carttotal';
import { BreadCrumbLayout } from '@root/components/layout';

const CartsPage = () => {

    const { guestId } = useGuest();

    const {
        data: carts,
        isLoading: isCartsLoading
    } = useCartsData(guestId);

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
                        <CartListTable cartsData={carts} isCartsLoading={isCartsLoading} />
                    </Col>
                    <Col xs={12} sm={4}>
                        {!!carts?.length && <CartTotal cartsData={carts} />}
                    </Col>
                </Row>

            </Container>
        </>
    )
}
export default CartsPage;