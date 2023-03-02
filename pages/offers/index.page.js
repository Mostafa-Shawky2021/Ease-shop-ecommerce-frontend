import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { dehydrate, QueryClient } from "@tanstack/react-query";

import { useProductsOffersData } from "./hooks";
import { useFilter } from "@root/hooks";

import { fetchProductsOffers } from "./queries";

import { Breadcrumb, Container, Row, Col } from "react-bootstrap";
import { Sidebar } from "@root/components/sidebar";
import { BreadCrumbLayout } from "@root/components/layout";
import { ProductsList } from "@root/components/productslist";

import { queryKeys } from "./data";

export async function getServerSideProps({ query }) {

    const queryClient = new QueryClient();

    const urlSearchParams = new URLSearchParams();

    // exclude page number from query paramters
    Object.entries(query).forEach(([key, value]) => (
        (key !== 'page') && urlSearchParams.set(key, encodeURIComponent(value))));

    const urlSearchParamsToString = urlSearchParams.toString();

    await queryClient.prefetchQuery(
        queryKeys.PRODUCTS_OFFERS(1, urlSearchParamsToString),
        () => fetchProductsOffers(1, urlSearchParamsToString));

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        },
    }
}


const OffersPage = () => {

    const [pageNumber, setPageNumber] = useState(1);

    const router = useRouter();

    const {
        data: productsData,
        isFetching: isFetchingProducts,
        isLoading: isLoadingProducts
    } = useProductsOffersData(pageNumber, router.query);

    const { applyFilter, resetFilter } = useFilter(pageNumber);

    useEffect(() => {

        window.scrollTo(0, 0);

    }, [pageNumber]);

    const handleFilter = (filterRules) => applyFilter(filterRules, `/offers`);

    const handleDeleteFilter = (setFilterRules) => resetFilter(setFilterRules, '/offers');

    return (
        <>
            <BreadCrumbLayout>
                <Breadcrumb.Item href="/homepage">الصفحة الرئيسية</Breadcrumb.Item>
                <Breadcrumb.Item active style={{ color: 'var(--bs-primary)', fontWeight: 'bold' }}>
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
                        ) : (<p>ليس متوفر عروض في الوقت الحالي</p>)}
                    </Col>
                </Row>
            </Container>
        </>

    )
}

export default OffersPage;