import { useRouter } from 'next/router';

import { dehydrate, QueryClient } from '@tanstack/react-query';

import { useProductDetailsData, useRelatedProductsData } from './hooks';

import { fetchProductDetails, fetchProductsRelated } from './queries';

import { Breadcrumb, Col, Container, Row } from 'react-bootstrap';
import { ProductView } from './components/productview';
import { ProductDetails } from './components/productdetails';
import { ProductDescription } from './components/productdescription';
import { RelatedProduct } from './components/relatedproduct';
import { BreadCrumbLayout } from '@root/components/layout';
import { ProductViewEffect } from './components/productview/productvieweffect';
import { queryKeys } from './data';

export const getServerSideProps = async ({ query }) => {

    const queryClient = new QueryClient();
    const productSlug = query.productSlug;

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

    const breadCrumbData = [
        { label: 'الصفحة الرئيسية', link: "/homepage" },
        { label: productDetails?.product_name, active: true }
    ]
    return (
        <>
            <BreadCrumbLayout data={breadCrumbData} />
            <Container style={{ marginTop: "2.8rem" }}>
                <Row>
                    <Col xs={12} md={5}>
                        <ProductView
                            ProductViewEffect={
                                <ProductViewEffect
                                    image={productDetails?.image}
                                    imageAlt={productDetails?.product_name}
                                    imagesThumbnails={productDetails?.images} />} />
                    </Col>
                    <Col xs={12} md={7}>
                        <ProductDetails productDetails={productDetails} />
                    </Col>
                </Row>
                <ProductDescription productDescription={productDetails?.long_description} />
            </Container>
            <RelatedProduct relatedProductsData={relatedProducts} />
        </>
    )
}
