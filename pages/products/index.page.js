import { useState } from 'react';
import { useRouter } from "next/router";

import { dehydrate, QueryClient } from "@tanstack/react-query";

import { useSearchProductsData } from "./hooks";

import { fetchProducts } from "./queries";
import { fetchProductVariants } from "@root/queries";

import { Breadcrumb, Container, Row, Col } from "react-bootstrap";
import { BreadCrumbLayout } from "@root/components/layout";
import { ProductsSearch } from "./components/productssearch";
import { Sidebar } from "@root/components/sidebar";

import { queryKeys } from "./data";
import { queryKeys as globalQueryKeys } from "data";



export async function getServerSideProps({ query }) {

    const queryClient = new QueryClient();

    const urlSearchParams = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => urlSearchParams.set(key, encodeURIComponent(value)));

    const urlSearchParamsToString = urlSearchParams.toString();

    await Promise.all([
        queryClient.prefetchQuery(
            queryKeys.SEARCH_PRODUCTS(urlSearchParamsToString),
            () => fetchProducts(urlSearchParamsToString)),
        queryClient.prefetchQuery(
            globalQueryKeys.PRODUCT_VARIANTS,
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

    const router = useRouter();

    const { data: productsSearchResult } = useSearchProductsData(router.query);

    const d = useSearchProductsData(router.query);
    const handleFilter = () => {

        const urlSearchParams = new URLSearchParams()

        Object.entries(filterRules).forEach(([filterKey, value]) => {
            if (value.length > 0) urlSearchParams.set(filterKey, encodeURIComponent(value.join('-')));
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

            <Container fluid="xl" style={{ marginTop: "2.8rem" }}>
                <Row className='g-0'>
                    <Col xs={3} className='d-none d-lg-block' >
                        <Sidebar
                            setFilterRules={setFilterRules}
                            filterRules={filterRules}
                            handleFilter={handleFilter}
                        />
                    </Col>
                    <Col xs={12} lg={9} >
                        <ProductsSearch products={productsSearchResult} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ProductsPageSearch;