import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { dehydrate, QueryClient } from "@tanstack/react-query";

import { useLatestProductsData } from "./hooks";

import { fetchLatestProducts } from "./queries";

import { generateQueryStringFilter } from "@root/utils";

import { Container, Row, Col } from "react-bootstrap";
import { BreadCrumbLayout } from "@root/components/layout";
import { ProductsList } from "@root/components/productslist";
import { SidebarFilter } from "@root/components/sidebars/sidebarfilter";
import { Loading } from "@root/components/loading";
import { Seek } from "react-loading-indicators";

import { queryKeys } from "./data";

import HomeIcon from "@mui/icons-material/Home";

export async function getServerSideProps({ query }) {
  const queryClient = new QueryClient();

  let filterQueryString = "";
  filterQueryString =
    Object.keys(query).length > 0
      ? generateQueryStringFilter(query) // extract query object data to make reqeust with filter rule
      : "";

  await queryClient.prefetchQuery(
    queryKeys.PRODUCTS_LATEST(1, filterQueryString),
    () => fetchLatestProducts(1, filterQueryString)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const LatestProdutsPage = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const router = useRouter();

  const latestProducts = useLatestProductsData(pageNumber, router.query);

  useEffect(() => {
    window.scrollTo({
		top:0,
		left:0,
		behavior:'smooth'
		
	});
  }, [pageNumber]);

  const breadCrumbData = [
    { label: "الصفحة الرئيسية", link: "/" },
    { label: "احدث المنتجات", active: true },
  ];

  return (
    <>
      <BreadCrumbLayout data={breadCrumbData} />
      <Container
        fluid="xxl"
        style={{ minHeight: "300px", position: "relative" }}
      >
        {latestProducts.isLoading ? (
          <Loading isOpacity={false}>
            <Seek color="#0d6efd" size="small" style={{ marginTop: "3rem" }} />
          </Loading>
        ) : (
          <Row className="g-0">
            <Col xs={12} md={4} lg={3}>
              <SidebarFilter pageNumber={pageNumber} />
            </Col>
            <Col xs={12} md={8} lg={9}>
              {!!latestProducts?.data?.products ? (
                <ProductsList
                  productsData={latestProducts.data}
                  setPageNumber={setPageNumber}
                />
              ) : (
                <div style={{ fontSize: "0.85rem", marginTop: "3rem" }}>
                  <p>لا يوجد منتجات للعرض</p>
                  <Link href="/" style={{ color: "var(--bs-primary)" }}>
                    العودة الي الصفحة الرئيسية
                    <HomeIcon fontSize="small" style={{ marginRight: "5px" }} />
                  </Link>
                </div>
              )}
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default LatestProdutsPage;
