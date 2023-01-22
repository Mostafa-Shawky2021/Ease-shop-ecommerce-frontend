import React from 'react';
import { useRouter } from 'next/router';

import { axiosInstance } from 'lib';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Col, Container, Row } from 'react-bootstrap';

import { Header } from '@root/components/header';
import { ProductView } from './components/productview';
import { ProductDetails } from './components/productdetails';
import { ProductDescription } from './components/productdescription';
import { RelatedProduct } from './components/relatedproduct';

import { queryKeys } from './data';
import { fetchProductDetails } from './queries';
import { useProductDetails } from './hooks';

export const getStaticPaths = async () => {

    const { data } = await axiosInstance.get('/api/products');
    const paths = data.map(product =>
    ({
        params:
            { productSlug: product.product_slug.toString() }
    }))

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async ({ params }) => {
    const queryClient = new QueryClient();
    const productSlug = params.productSlug;
    await queryClient.prefetchQuery(
        queryKeys.PRODUCT_DETAILS(productSlug),
        (productSlug) => fetchProductDetails(productSlug))

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        },
    }
}
export default function ProductDetailsPage() {

    const { query: { productSlug } } = useRouter();
    const { data } = useProductDetails(productSlug)

    return (
        <>
            <Header />
            <Container style={{ marginTop: "2.8rem" }}>
                <Row>
                    <Col xs={12} md={6}>
                        <ProductView image={data?.image} imagesThumbnails={data?.images} />
                    </Col>
                    <Col xs={12} md={6}>
                        <ProductDetails productDetails={data} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <ProductDescription productDescription={data?.long_description} />
                    </Col>
                </Row>
            </Container>
            {/* <RelatedProduct /> */}
        </>
    )
}
