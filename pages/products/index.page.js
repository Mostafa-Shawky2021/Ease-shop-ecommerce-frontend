import { useState } from 'react';
import { useRouter } from "next/router";

import { dehydrate, QueryClient } from "@tanstack/react-query";

import { useProductsData } from "@root/hooks";

import { fetchProducts, fetchProductVariants } from "@root/queries";

import { Breadcrumb, Container, Row, Col } from "react-bootstrap";
import { BreadCrumbLayout } from "@root/components/layout";
import { ProductsSearch } from "./components/productssearch";
import { Sidebar } from "@root/components/sidebar";

import { queryKeys } from "data";



export async function getServerSideProps({ query }) {

    const queryClient = new QueryClient();

    const urlSearchParams = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => (
        urlSearchParams.set(key, encodeURIComponent(value))));

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

    const [filterRules, setFilterRules] = useState({
        price: [50, 3000],
        sizes: [],
        colors: [],
    });

    const [pageNumber, setPageNumber] = useState(1);

    const router = useRouter();

    const { data: productsSearchResult } = useProductsData(pageNumber, router.query);


    const handleFilter = () => {

        const urlSearchParams = new URLSearchParams()

        Object.entries(filterRules).forEach(([filterKey, value]) => {
            if (value.length > 0) {
                urlSearchParams.set(filterKey, encodeURIComponent(value.join('-')));
            }
        });

        const urlSearchParamsToString = urlSearchParams.toString();
        const productName = router.query.productname;

        // this condition to avoid if user remove product name from the url
        const filterUrl = productName
            ? `/products?productname=${router.query.productname}&${urlSearchParamsToString}`
            : `/products?${urlSearchParamsToString}`;
        router.push(filterUrl, undefined, { shallow: true });
    }

    return (
        <>
            <BreadCrumbLayout>
                <Breadcrumb.Item href="/homepage">الصفحة الرئيسية</Breadcrumb.Item>
                <Breadcrumb.Item active style={{ color: 'var(--bs-primary)', fontWeight: 'bold' }}>
                    {router.query.productname}
                </Breadcrumb.Item>
            </BreadCrumbLayout>

            <Container fluid="xxl" style={{ marginTop: "2.8rem" }}>
                <Row className='g-0'>
                    <Col xs={3} className='d-none d-lg-block' >
                        <Sidebar
                            setFilterRules={setFilterRules}
                            filterRules={filterRules}
                            handleFilter={handleFilter}
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