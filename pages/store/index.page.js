import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from "@tanstack/react-query";

import { useProductsData, useFilter } from "@root/hooks";

import { fetchProducts } from "@root/queries";

import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { ProductsList } from "@root/components/productslist";
import { SidebarFilter } from "@root/components/sidebars/sidebarfilter";
import { BreadCrumbLayout } from '@root/components/layout';
import { ToastContainer } from 'react-toastify';

import { queryKeys } from "data";


export async function getServerSideProps({ query }) {

    const queryClient = new QueryClient();

    const urlSearchParams = new URLSearchParams();

    // exclude page number from query paramters
    Object.entries(query).forEach(([key, value]) => (
        (key !== 'page') && urlSearchParams.set(key, encodeURIComponent(value))));

    const urlSearchParamsToString = urlSearchParams.toString();

    await queryClient.prefetchQuery(
        queryKeys.PRODUCTS(1, urlSearchParamsToString),
        () => fetchProducts(1, urlSearchParamsToString));

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        },
    }
}

const StorePage = () => {

    const [pageNumber, setPageNumber] = useState(1);

    const router = useRouter();

    const {
        data: productsData,
        isFetching: isFetchingProducts,
        isLoading: isLoadingProducts
    } = useProductsData(pageNumber, router.query);

    const { applyFilter, resetFilter } = useFilter(pageNumber);

    useEffect(() => {

        window.scrollTo(0, 0);

    }, [pageNumber]);

    const handleFilter = (filterRules) => applyFilter(filterRules, `/store`);

    const handleDeleteFilter = (setFilterRules) => resetFilter(setFilterRules, '/store');

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
                        <SidebarFilter
                            handleFilter={handleFilter}
                            handleDeleteFilter={handleDeleteFilter} />
                    </Col>
                    <Col xs={12} lg={9} style={{ position: 'relative' }}>
                        {!!productsData?.products.length ? (
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