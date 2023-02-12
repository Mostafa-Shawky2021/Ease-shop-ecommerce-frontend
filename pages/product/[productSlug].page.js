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

import { fetchProductDetails, fetchProductsRelated } from './queries';
import { useProductDetailsData, useRelatedProductsData } from './hooks';

export const getStaticPaths = async () => {

    const { data: products } = await axiosInstance.get('/api/products');
    const paths = products.map(product =>
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
    await Promise.all([
        queryClient.prefetchQuery(
            queryKeys.PRODUCT_DETAILS(productSlug),
            () => fetchProductDetails(productSlug)),
        queryClient.prefetchQuery(
            queryKeys.PRODUCT_RELATED(productSlug),
            () => fetchProductsRelated(productSlug)),
    ])

    return {
        props: {
            dehydratedState: dehydrate(queryClient),

        },
    }
}
export default function ProductDetailsPage() {

    const { query: { productSlug } } = useRouter();

    const { data: productDetails } = useProductDetailsData(productSlug);
    const { data: relatedProducts } = useRelatedProductsData(productSlug);

    return (
        <>
            <Container style={{ marginTop: "2.8rem" }}>
                <Row>
                    <Col xs={12} md={6}>
                        <ProductView
                            image={productDetails?.image}
                            imagesThumbnails={productDetails?.images}
                            imageAlt={productDetails?.product_name}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <ProductDetails productDetails={productDetails} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <ProductDescription productDescription={productDetails?.long_description} />
                    </Col>
                </Row>
            </Container>
            <RelatedProduct relatedProductsData={relatedProducts} />
        </>
    )
}
