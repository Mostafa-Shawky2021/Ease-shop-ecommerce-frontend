import Link from "next/link";
import { useState, useEffect } from "react";

import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import { useProductsData } from "@root/hooks";

import { fetchProducts } from "@root/queries";

import { Container, Row, Col } from "react-bootstrap";
import { ProductsList } from "@root/components/productslist";
import { SidebarFilter } from "@root/components/sidebars/sidebarfilter";
import { BreadCrumbLayout } from "@root/components/layout";
import { Loading } from "@root/components/loading";

import { queryKeys } from "data";
import generateQueryStringFilter from "utils/generateQueryStringFilter";
import { Seek } from "react-loading-indicators";
import HomeIcon from "@mui/icons-material/Home";

export async function getServerSideProps({ query }) {
  const queryClient = new QueryClient();

  const uriQueryStringFilter = generateQueryStringFilter(query);

  await queryClient.prefetchQuery(
    queryKeys.PRODUCTS(1, uriQueryStringFilter),
    () => fetchProducts(1, uriQueryStringFilter)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const StorePage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  // const [test,setTest] = useState(window?.localStorage.getItem('name'));

  const { query } = useRouter();
  const productsData = useProductsData(pageNumber, query);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNumber]);

  const breadCrumbData = [
    { label: "الصفحة الرئيسية", link: "/" },
    { label: "المتجر", active: true },
  ];
	

  return (
    <>
      <BreadCrumbLayout data={breadCrumbData} />
      <Container
        fluid="xxl"
        style={{ minHeight: "500px", position: "relative" }}
      >
        {productsData.isLoading ? (
          <Loading isOpacity={false}>
            <Seek color="#0d6efd" size="small" style={{ marginTop: "3rem" }} />
          </Loading>
        ) : (
          <Row className="g-0">
            <Col xs={12} md={4} lg={3}>
              <SidebarFilter pageNumber={pageNumber} />
            </Col>
            <Col xs={12} md={8} lg={9} style={{ position: "relative" }}>
              {!!productsData.data?.products ? (
                <ProductsList
                  productsData={productsData.data}
                  setPageNumber={setPageNumber}
                />
              ) : (
                <div style={{ fontSize: "0.85rem", marginTop: "2.3rem" }}>
                  <p>لا يوجد منتحات للعرض</p>
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
export default StorePage;
