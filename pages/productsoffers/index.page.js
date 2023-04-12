import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { dehydrate, QueryClient } from "@tanstack/react-query";

import { useProductsOffersData } from "./hooks";

import { fetchProductsOffers } from "./queries";

import { generateQueryStringFilter } from "@root/utils";

import { Breadcrumb, Container, Row, Col } from "react-bootstrap";
import { SidebarFilter } from "@root/components/sidebars/sidebarfilter";
import { BreadCrumbLayout } from "@root/components/layout";
import { ProductsList } from "@root/components/productslist";

import { queryKeys } from "data";

export async function getServerSideProps({ query }) {

    const queryClient = new QueryClient();

    let filterQueryString = ""
    filterQueryString = Object.keys(query).length > 0
        ? generateQueryStringFilter(query) // if the url contain filter string
        : 'offers=true'; // default while generating page component with query filter string

    await queryClient.prefetchQuery(
        queryKeys.PRODUCTS(1, filterQueryString),
        () => fetchProductsOffers(1, filterQueryString));

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        },
    }
}

const ProductsOffers = () => {

    const [pageNumber, setPageNumber] = useState(1);

    const router = useRouter();

    const {
        data: productsData,
        isFetching: isFetchingProducts,
        isLoading: isLoadingProducts
    } = useProductsOffersData(pageNumber, router.query);

    useEffect(() => {

        window.scrollTo(0, 0);

    }, [pageNumber]);

    const breadCrumbData = [
        { label: 'الصفحة الرئيسية', link: "/homepage" },
        { label: 'الخصومات', active: true }
    ]

    return (
        <>
            <BreadCrumbLayout data={breadCrumbData} />
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
                        ) : (<p>ليس متوفر عروض في الوقت الحالي</p>)}
                    </Col>
                </Row>
            </Container>
        </>

    )
}

export default ProductsOffers;