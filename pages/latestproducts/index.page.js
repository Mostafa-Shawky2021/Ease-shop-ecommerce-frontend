import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { dehydrate, QueryClient } from "@tanstack/react-query";

import { useLatestProductsData } from "./hooks";

import { fetchLatestProducts } from "./queries";

import { generateQueryStringFilter } from "@root/utils";

import { Breadcrumb, Container, Row, Col } from "react-bootstrap";
import { BreadCrumbLayout } from "@root/components/layout";
import { ProductsList } from "@root/components/productslist";
import { SidebarFilter } from "@root/components/sidebars/sidebarfilter";

import { queryKeys } from "data";

export async function getServerSideProps({ query }) {

    const queryClient = new QueryClient();

    let filterQueryString = ""
    filterQueryString = Object.keys(query).length > 0
        ? generateQueryStringFilter(query) // if the url contain filter string
        : 'latest=true'; // default while generating page component with query filter string

    await queryClient.prefetchQuery(
        queryKeys.PRODUCTS(1, filterQueryString),
        () => fetchLatestProducts(1, filterQueryString));

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        },
    }
}

const LatestProdutsPage = () => {

    const [pageNumber, setPageNumber] = useState(1);

    const router = useRouter();

    const {
        data: productsData,
        isFetching: isFetchingProducts,
        isLoading: isLoadingProducts
    } = useLatestProductsData(pageNumber, router.query);

    useEffect(() => {

        window.scrollTo(0, 0);

    }, [pageNumber]);

    const breadCrumbData = [
        { label: 'الصفحة الرئيسية', link: "/homepage" },
        { label: 'احدث المنتجات', active: true }
    ]

    return (
        <>
            <BreadCrumbLayout data={breadCrumbData}>
                <Breadcrumb.Item href="/homepage">الصفحة الرئيسية</Breadcrumb.Item>
                <Breadcrumb.Item active style={{ color: 'var(--bs-primary)', fontWeight: '500' }}>
                    احدث المنتجات
                </Breadcrumb.Item>
            </BreadCrumbLayout>
            <Container fluid="xxl">
                <Row className='g-0'>
                    <Col xs={3} className='d-none d-lg-block' >
                        <SidebarFilter pageNumber={pageNumber} />
                    </Col>
                    <Col xs={12} lg={9} style={{ position: 'relative' }}>
                        {productsData?.products ? (
                            <ProductsList
                                productsData={productsData}
                                isFetchingProducts={isFetchingProducts}
                                isLoadingProducts={isLoadingProducts}
                                setPageNumber={setPageNumber} />
                        ) : (<p>ليس متوفر منتجات في الوقت الحالي</p>)}
                    </Col>
                </Row>
            </Container>
        </>

    )
}

export default LatestProdutsPage;