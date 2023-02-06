import { dehydrate, QueryClient } from "@tanstack/react-query";
import { queryKeys } from "./data";
import { fetchProducts } from "./queries";

import { Container, Row, Col, Breadcrumb } from "react-bootstrap";

import { Products } from "./component/products";
import { Sidebar } from "@root/components/sidebar";


export async function getStaticProps() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(queryKeys.PRODUCTS, fetchProducts);
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        },
    }
}


const StorePage = () => {
    return (
        <>
            <Breadcrumb>
                <Container style={{ display: 'flex' }}>
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                        Library
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Data</Breadcrumb.Item>
                </Container>
            </Breadcrumb>
            <Container fluid="xl" style={{ marginTop: "2.8rem" }}>
                <Row className='g-0'>
                    <Col xs={3} className='d-none d-lg-block' >
                        <Sidebar />
                    </Col>
                    <Col xs={12} lg={9} style={{ position: 'relative' }}>
                        <Products />
                    </Col>
                </Row>
            </Container>
        </>

    )
}
export default StorePage;