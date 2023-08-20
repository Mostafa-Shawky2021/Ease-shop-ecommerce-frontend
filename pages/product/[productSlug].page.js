import { useRouter } from "next/router";

import { dehydrate, QueryClient } from "@tanstack/react-query";

import { useProductDetailsData, useRelatedProductsData } from "./hooks";

import { fetchProductDetails, fetchProductsRelated } from "./queries";

import { Col, Container, Row } from "react-bootstrap";
import { Loading } from "@root/components/loading";
import { Seek } from "react-loading-indicators";
import { ProductView } from "./components/productview";
import { ProductDetails } from "./components/productdetails";
import { ProductDescription } from "./components/productdescription";
import { RelatedProduct } from "./components/relatedproduct";
import { BreadCrumbLayout } from "@root/components/layout";
import { ProductViewEffect } from "./components/productview/productvieweffect";

import { queryKeys } from "./data";

export const getServerSideProps = async ({ query }) => {
  const queryClient = new QueryClient();
  const productSlug = query.productSlug;

  await Promise.allSettled([
    queryClient.prefetchQuery(queryKeys.PRODUCT_DETAILS(productSlug), () =>
      fetchProductDetails(productSlug)
    ),
    queryClient.prefetchQuery(queryKeys.PRODUCT_RELATED(productSlug), () =>
      fetchProductsRelated(productSlug)
    ),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
export default function ProductDetailsPage() {
  const {
    query: { productSlug },
  } = useRouter();

  const { data: productDetails, isLoading: isLoadingProduct } =
    useProductDetailsData(productSlug);
  const { data: relatedProducts } = useRelatedProductsData(productSlug);

  const breadCrumbData = [
    { label: "الصفحة الرئيسية", link: "/" },
    { label:productSlug, active: true },
  ];
  return (
    <>
      <BreadCrumbLayout data={breadCrumbData} />
      <Container
        style={{ marginTop: "2.8rem", position: "relative", minHeight: "70vh" }}
      >
        {isLoadingProduct ? (
          <Loading isOpacity={false}>
            <Seek color="#0d6efd" size="small" style={{ marginTop: "3rem" }} />
          </Loading>
        ) : (
          <>
            <Row>
              <Col xs={12} md={5}>
                <ProductView
                  ProductViewEffect={
                    <ProductViewEffect
                      image={productDetails?.image}
                      imageAlt={productDetails?.product_name}
                      imagesThumbnails={productDetails?.images}
                    />
                  }
                />
              </Col>
              <Col xs={12} md={6}>
                <ProductDetails productDetails={productDetails} />
              </Col>
            </Row>
            {productDetails?.long_description && (
              <ProductDescription
                productDescription={productDetails.long_description}
              />
            )}
            <RelatedProduct relatedProductsData={relatedProducts} />
          </>
        )}
      </Container>
    </>
  );
}
