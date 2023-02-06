import React, { useState } from 'react';
import { useRouter } from "next/router";

import { dehydrate, QueryClient } from "@tanstack/react-query";

import { axiosInstance } from "lib";
import { fetchCategoryProducts } from "./queries";
import { useCategoryProductsData } from "./hooks";

import { queryKeys } from "./data";

import { Container, Col, Row } from "react-bootstrap";
import { CategoryProductsList } from "./components/categoryproductslist";
import { Sidebar } from "@root/components/sidebar";



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
const CategoryProducts = () => {

    return (
        <Container fluid="xl" style={{ marginTop: "2.8rem" }}>
            <Row className='g-0'>
                <Col xs={3} className='d-none d-lg-block' >
                    <Sidebar />
                </Col>
                <Col xs={12} lg={9} style={{ position: 'relative' }}>
                    <CategoryProductsList />
                </Col>
            </Row>
        </Container>
    )
}

export default CategoryProducts;