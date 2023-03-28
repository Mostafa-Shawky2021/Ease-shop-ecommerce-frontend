import { useState, useEffect } from 'react';
import { useRouter } from "next/router";

import { dehydrate, QueryClient } from "@tanstack/react-query";

import { useProductsData, useFilter } from "@root/hooks";

import { fetchProducts, fetchProductVariants } from "@root/queries";

import { Breadcrumb, Container, Row, Col } from "react-bootstrap";
import { BreadCrumbLayout } from "@root/components/layout";
import { ProductsSearch } from "./components/productssearch";
import { Sidebar } from "@root/components/sidebar";

import { queryKeys } from "data";



export async function getServerSideProps({ query }) {

    const queryClient = new QueryClient();

    const urlSearchParams = new URLSearchParams();

    //exclude page number from query paramters
    Object.entries(query).forEach(([key, value]) => (
        (key !== 'page') && urlSearchParams.set(key, encodeURIComponent(value))));

    const urlSearchParamsToString = urlSearchParams.toString();

    await Promise.all([
        queryClient.prefetchQuery(
            queryKeys.PRODUCTS(1, urlSearchParamsToString),
            () => fetchProducts(1, urlSearchParamsToString,)),
        queryClient.prefetchQuery(
            queryKeys.PRODUCT_VARIANTS,
            fetchProductVariants)
    ]);

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        },
    }
}

const ProductsPageSearch = () => {


    const [pageNumber, setPageNumber] = useState(1);

    const router = useRouter();

    const { applyFilter, resetFilter } = useFilter(pageNumber);

    const { data: productsSearchResult } = useProductsData(pageNumber, router.query);

    useEffect(() => {
        Object.entries(router.query).length < 1 ? router.push('/homepage') : null;
    }, [])


    const handleFilter = (filterRules) => {

        const productName = router?.query?.productname;

        applyFilter(
            filterRules,
            '/products',
            { queriesFilter: productName ? { productname: productName } : null });

    }

    const handleDeleteFilter = () => {
        resetFilter(setFilterRules, `/products?productname=${router?.query?.productname}`)
    }
    return (
        <>
            <BreadCrumbLayout>
                <Breadcrumb.Item href="/homepage">الصفحة الرئيسية</Breadcrumb.Item>
                <Breadcrumb.Item active style={{ color: 'var(--bs-primary)', fontWeight: '500' }}>
                    {router.query.productname}
                </Breadcrumb.Item>
            </BreadCrumbLayout>

            <Container fluid="xxl" style={{ marginTop: "2.8rem" }}>
                <Row className='g-0'>
                    <Col xs={3} className='d-none d-lg-block' >
                        <Sidebar
                            handleFilter={handleFilter}
                            handleDeleteFilter={handleDeleteFilter}
                        />
                    </Col>
                    <Col xs={12} lg={9} >
                        {productsSearchResult?.products ?
                            (<ProductsSearch
                                products={productsSearchResult}
                                setPageNumber={setPageNumber}
                            />)
                            : (<p>لا توجد منتجات للعرض</p>)}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ProductsPageSearch;