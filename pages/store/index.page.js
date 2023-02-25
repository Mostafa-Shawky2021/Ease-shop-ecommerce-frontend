import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from "@tanstack/react-query";

import { useProductsData } from "@root/hooks";

import { fetchProducts } from "@root/queries";

import { queryKeys } from "data";

import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Products } from "./component/products";
import { Sidebar } from "@root/components/sidebar";
import { BreadCrumbLayout } from '@root/components/layout';

export async function getStaticProps() {

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(
        queryKeys.PRODUCTS(1),
        () => fetchProducts(1));

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        },
    }
}


const StorePage = () => {

    const [pageNumber, setPageNumber] = useState(1);
    const [filterRules, setFilterRules] = useState({
        price: [50, 3000],
        sizes: [],
        colors: [],
    });


    const router = useRouter();
    const {
        data: productsData,
        isFetching: isFetchingProducts,
        isLoading: isLoadingProducts } = useProductsData(pageNumber, router.query);

    useEffect(() => {

        window.scrollTo(0, 0);

    }, [pageNumber])
    const handleFilter = () => {

        const urlSearchParams = new URLSearchParams()

        Object.entries(filterRules).forEach(([filterKey, value]) => {
            if (value.length > 0) {
                urlSearchParams.set(filterKey, encodeURIComponent(value.join('-')));
            }
        });

        const urlSearchParamsToString = urlSearchParams.toString();

        const filterUrl = `/store?page=${pageNumber}&${urlSearchParamsToString}`;

        router.push(filterUrl, undefined, { shallow: true });
    }

    const handleDeleteFilter = () => {
        setFilterRules({
            price: [50, 3000],
            sizes: [],
            colors: [],
        })
        router.push('/store', undefined, { shallow: true });
    }

    return (
        <>
            <BreadCrumbLayout>
                <Breadcrumb.Item href="/homepage">الصفحة الرئيسية</Breadcrumb.Item>
                <Breadcrumb.Item active style={{ color: 'var(--bs-primary)', fontWeight: 'bold' }}>
                    المتجر
                </Breadcrumb.Item>
            </BreadCrumbLayout>
            <Container fluid="xxl">
                <Row className='g-0'>
                    <Col xs={3} className='d-none d-lg-block' >
                        <Sidebar
                            setFilterRules={setFilterRules}
                            filterRules={filterRules}
                            handleFilter={handleFilter}
                            handleDeleteFilter={handleDeleteFilter}
                        />
                    </Col>
                    <Col xs={12} lg={9} style={{ position: 'relative' }}>
                        {productsData?.products ? (
                            <Products
                                productsData={productsData}
                                isFetchingProducts={isFetchingProducts}
                                isLoadingProducts={isLoadingProducts}
                                setPageNumber={setPageNumber}
                            />
                        ) : (<p>لا توجد منتجات للعرض</p>)}

                    </Col>
                </Row>
            </Container>

        </>

    )
}
export default StorePage;