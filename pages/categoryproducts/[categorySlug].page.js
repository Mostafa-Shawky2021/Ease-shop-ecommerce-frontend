import { useEffect, useState } from "react";


import { dehydrate, QueryClient } from "@tanstack/react-query";

import { axiosInstance } from "lib";

import { useRouter } from 'next/router';
import { useCategoryProductsData } from "./hooks";

import { fetchCategoryProducts } from "@root/queries";

import { Container, Col, Row } from "react-bootstrap";
import { CategoryProductsList } from "./components/categoryproductslist";
import { Sidebar } from "@root/components/sidebar"

import { queryKeys } from "./data";

;



export const getStaticPaths = async () => {

    const { data: categories } = await axiosInstance.get('/api/categories');
    const paths = categories.map(category =>
    ({
        params:
            { categorySlug: category.cat_slug.toString() }
    }))

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async ({ params }) => {
    const queryClient = new QueryClient();
    const catSlug = params.categorySlug;

    await queryClient.prefetchQuery(
        queryKeys.CATEGORY_PRODUCTS(catSlug, 1),
        () => fetchCategoryProducts(catSlug, 1)
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        },
    }
}
const CategoryProductsPage = () => {

    const [pageNumber, setPageNumber] = useState(1);
    const [filterRules, setFilterRules] = useState({
        price: [50, 3000],
        sizes: [],
        colors: [],
    });
    const { query: { categorySlug } } = useRouter();
    const {
        data: productsCategory,
        isFetching: isFetchingProductsCategory,
        isLoadingProductsCategory: isLoadingProductsCategory } = useCategoryProductsData(categorySlug, pageNumber)
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
        <Container fluid="xl" style={{ marginTop: "2.8rem" }}>
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
                    <CategoryProductsList
                        productsCategoryData={productsCategory}
                        isFetchingProductsCategory={isFetchingProductsCategory}
                        isLoadingProductsCategory={isLoadingProductsCategory}
                        setPageNumber={setPageNumber}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default CategoryProductsPage;