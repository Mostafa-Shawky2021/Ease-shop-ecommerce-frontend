import { Breadcrumb, Container, Row, Col } from "react-bootstrap";
import { BreadCrumbLayout } from "@root/components/layout";
import { ProductsList } from "@root/components/productslist";
import { Sidebar } from "@root/components/sidebar";
const LatestProdutsPage = () => {
    return (
        <>
            <BreadCrumbLayout>
                <Breadcrumb.Item href="/homepage">الصفحة الرئيسية</Breadcrumb.Item>
                <Breadcrumb.Item active style={{ color: 'var(--bs-primary)', fontWeight: '500' }}>
                    العروض المميزة
                </Breadcrumb.Item>
            </BreadCrumbLayout>
            <Container fluid="xxl">
                <Row className='g-0'>
                    <Col xs={3} className='d-none d-lg-block' >
                        <Sidebar
                            handleFilter={handleFilter}
                            handleDeleteFilter={handleDeleteFilter}
                        />
                    </Col>
                    <Col xs={12} lg={9} style={{ position: 'relative' }}>
                        {productsData?.products ? (
                            <ProductsList
                                productsData={productsData}
                                isFetchingProducts={isFetchingProducts}
                                isLoadingProducts={isLoadingProducts}
                                setPageNumber={setPageNumber}
                            />
                        ) : (<p>ليس متوفر منتجات في الوقت الحالي</p>)}
                    </Col>
                </Row>
            </Container>
        </>

    )
}

export default LatestProdutsPage;