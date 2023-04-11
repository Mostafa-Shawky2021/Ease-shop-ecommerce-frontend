import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from "@tanstack/react-query";

import { useProductsData } from "@root/hooks";

import { fetchProducts } from "@root/queries";

import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { ProductsList } from "@root/components/productslist";
import { SidebarFilter } from "@root/components/sidebars/sidebarfilter";
import { BreadCrumbLayout } from '@root/components/layout';

import { queryKeys } from "data";
import generateQueryStringFilter from 'utils/generateQueryStringFilter';


export async function getServerSideProps({ query }) {

    const queryClient = new QueryClient();

    const uriQueryStringFilter = generateQueryStringFilter(query);

    await queryClient.prefetchQuery(
        queryKeys.PRODUCTS(1, uriQueryStringFilter),
        () => fetchProducts(1, uriQueryStringFilter));

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        },
    }
}

const StorePage = () => {

    const [pageNumber, setPageNumber] = useState(1);

    const { query } = useRouter();
    const {
        data: productsData,
        isFetching: isFetchingProducts,
        isLoading: isLoadingProducts
    } = useProductsData(pageNumber, query);

    useEffect(() => {

        window.scrollTo(0, 0);

    }, [pageNumber]);



    return (
        <>
            <BreadCrumbLayout>
                <Breadcrumb.Item href="/homepage">الصفحة الرئيسية</Breadcrumb.Item>
                <Breadcrumb.Item active style={{ color: 'var(--bs-primary)', fontWeight: '500' }}>
                    المتجر
                </Breadcrumb.Item>
            </BreadCrumbLayout>
            <Container fluid="xxl">

                <Row className='g-0'>
                    <Col xs={3} className='d-none d-lg-block' >
                        <SidebarFilter pageNumber={pageNumber} />
                    </Col>
                    <Col xs={12} lg={9} style={{ position: 'relative' }}>
                        {!!productsData?.products?.length ? (
                            <ProductsList
                                productsData={productsData}
                                isFetchingProducts={isFetchingProducts}
                                isLoadingProducts={isLoadingProducts}
                                setPageNumber={setPageNumber} />
                        ) : (<p>لا توجد منتجات للعرض</p>)}
                    </Col>
                </Row>
            </Container>
        </>

    )
}
export default StorePage;