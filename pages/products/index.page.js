import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { dehydrate, QueryClient } from "@tanstack/react-query";

import { useProductsData } from "@root/hooks";

import { fetchProducts, fetchProductVariants } from "@root/queries";

import { Container, Row, Col } from "react-bootstrap";
import { BreadCrumbLayout } from "@root/components/layout";
import { ProductsSearch } from "./components/productssearch";
import { SidebarFilter } from "@root/components/sidebars/sidebarfilter";

import Link from "next/link";
import { queryKeys } from "data";
import { Loading } from "@root/components/loading";
import { Seek } from "react-loading-indicators";

import HomeIcon from "@mui/icons-material/Home";

export async function getServerSideProps({ query }) {
	const queryClient = new QueryClient();

	const urlSearchParams = new URLSearchParams();

	//exclude page number from query paramters
	Object.entries(query).forEach(([key, value]) => key !== "page" && urlSearchParams.set(key, encodeURIComponent(value)));

	const urlSearchParamsToString = urlSearchParams.toString();

	await Promise.all([queryClient.prefetchQuery(queryKeys.PRODUCTS(1, urlSearchParamsToString), () => fetchProducts(1, urlSearchParamsToString)), queryClient.prefetchQuery(queryKeys.PRODUCT_VARIANTS, fetchProductVariants)]);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}

const ProductsPageSearch = () => {
	const [pageNumber, setPageNumber] = useState(1);

	const router = useRouter();

	const productsSearchResult = useProductsData(pageNumber, router.query);

	useEffect(() => {
		Object.entries(router.query).length < 1 ? router.push("/") : null;
	}, [router]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pageNumber]);

	const productNameQueryString = router.query.productname ? { productname: router.query.productname } : null;

	const breadCrumbData = [
		{ label: "الصفحة الرئيسية", link: "/" },
		{ label: router.query.productname, active: true },
	];

	return (
		<>
			<BreadCrumbLayout data={breadCrumbData} />
			<Container fluid="xxl">
				<Row className="g-0">
					<Col xs={12} md={4} lg={3}>
						<SidebarFilter pageNumber={pageNumber} additionalQuery={productNameQueryString} />
					</Col>
					<Col xs={12} md={8} lg={9} style={{ position: "relative" }}>
						{productsSearchResult.isLoading ? (
							<Loading isOpacity={false}>
								<Seek color="#0d6efd" size="small" style={{ marginTop: "3rem" }} />
							</Loading>
						) : !!productsSearchResult?.data?.products ? (
							<ProductsSearch products={productsSearchResult?.data} setPageNumber={setPageNumber} />
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
			</Container>
		</>
	);
};

export default ProductsPageSearch;
