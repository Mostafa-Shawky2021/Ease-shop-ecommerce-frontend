import { useState, useEffect } from 'react';
import { useRouter } from "next/router";

import { dehydrate, QueryClient } from "@tanstack/react-query";

import { useProductsData, useFilter } from "@root/hooks";

import { fetchProducts, fetchProductVariants } from "@root/queries";

import { Breadcrumb, Container, Row, Col } from "react-bootstrap";
import { BreadCrumbLayout } from "@root/components/layout";
import { ProductsSearch } from "./components/productssearch";
import { SidebarFilter } from "@root/components/sidebars/sidebarfilter";

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

    const { data: productsSearchResult } = useProductsData(pageNumber, router.query);

    useEffect(() => {
        Object.entries(router.query).length < 1 ? router.push('/homepage') : null;
    }, [router])


    const productNameQueryString = router.query.productname
        ? { productname: router.query.productname }
        : null;

    const breadCrumbData = [
        { label: 'الصفحة الرئيسية', link: "/homepage" },
        { label: router.query.productname, active: true }
    ]

    return (
        <>
            <BreadCrumbLayout data={breadCrumbData} />
            <Container fluid="xxl" style={{ marginTop: "2.8rem" }}>
                <Row className='g-0'>
                    <Col xs={3} className='d-none d-lg-block' >
                        <SidebarFilter
                            pageNumber={pageNumber}
                            additionalQuery={productNameQueryString} />
                    </Col>
                    <Col xs={12} lg={9}>
                        {productsSearchResult?.products
                            ? <ProductsSearch
                                products={productsSearchResult}
                                setPageNumber={setPageNumber} />
                            : <p>لا توجد منتجات للعرض</p>
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ProductsPageSearch;