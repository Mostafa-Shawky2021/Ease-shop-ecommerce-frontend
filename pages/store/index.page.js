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
import { Seek } from 'react-loading-indicators';
import { Loading } from '@root/components/loading';


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
    const productsData = useProductsData(pageNumber, query);

    useEffect(() => {

        window.scrollTo(0, 0);

    }, [pageNumber]);

    const breadCrumbData = [
        { label: 'الصفحة الرئيسية', link: "/homepage" },
        { label: 'المتجر', active: true }
    ]

    return (
        <>
            <BreadCrumbLayout data={breadCrumbData} />
            <Container fluid="xxl">
                <Row className='g-0' style={{ position: 'relative', minHeight: '70vh' }}>
                    {productsData.isLoading // for first time loading indicator
                        ? <Loading isOpacity={true}>
                            <Seek color="#ffb700" size="medium" />
                        </Loading>
                        : <>
                            <Col xs={3} className='d-none d-lg-block' >
                                <SidebarFilter pageNumber={pageNumber} />
                            </Col>
                            <Col xs={12} lg={9} style={{ position: 'relative' }}>
                                {!!productsData.data?.products ?
                                    <ProductsList
                                        productsData={productsData.data}
                                        isFetchingProducts={productsData.isFetching}
                                        setPageNumber={setPageNumber} />
                                    : <p>لا توجد منتجات للعرض</p>
                                }
                            </Col>
                        </>
                    }

                </Row>
            </Container>
        </>

    )
}
export default StorePage;