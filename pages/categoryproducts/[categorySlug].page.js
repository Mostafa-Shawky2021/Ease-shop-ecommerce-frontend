import Link from "next/link";
import { useEffect, useState } from "react";

import { dehydrate, QueryClient } from "@tanstack/react-query";

import { useRouter } from "next/router";

import { useCategoryProductsData } from "./hooks";

import { fetchCategoryProducts } from "./queries";

import { generateQueryStringFilter } from "@root/utils";

import { Container, Col, Row, Breadcrumb } from "react-bootstrap";
import { CategoryProductsList } from "./components/categoryproductslist";
import { BreadCrumbLayout } from "@root/components/layout";
import { SidebarFilter } from "@root/components/sidebars/sidebarfilter";

import { Loading } from "@root/components/loading";
import { Seek } from "react-loading-indicators";
import { queryKeys } from "./data";

import HomeIcon from "@mui/icons-material/Home";

export const getServerSideProps = async ({ query }) => {
	const queryClient = new QueryClient();

	const { categorySlug: catSlug, ...restQueryParamter } = query;

	const uriQueryStringFilter = Object.entries(restQueryParamter).length > 0 ? generateQueryStringFilter(restQueryParamter) : "";

	await queryClient.prefetchQuery(queryKeys.CATEGORY_PRODUCTS(1, catSlug, uriQueryStringFilter), () => fetchCategoryProducts(1, catSlug, uriQueryStringFilter));

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
};
const CategoryProductsPage = () => {
	const [pageNumber, setPageNumber] = useState(1);

	const { query } = useRouter();

	const categoryProducts = useCategoryProductsData(pageNumber, query);

	const dynamicRouteCategory = { categorySlug: query.categorySlug };

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pageNumber]);

	const breadCrumbData = [
		{ label: "الصفحة الرئيسية", link: "/" },
		{ label: query?.categorySlug, active: true },
	];

	return (
		<>
			<BreadCrumbLayout data={breadCrumbData} />
			<Container fluid="xxl" style={{ minHeight: "300px", position: "relative" }}>
				<Row className="g-0">
					{categoryProducts.isLoading ? (
						<Loading isOpacity={false}>
							<Seek color="#0d6efd" size="small" style={{ marginTop: "3rem" }} />
						</Loading>
					) : (
						<>
							<Col xs={12} md={4} lg={3}>
								<SidebarFilter pageNumber={pageNumber} dynamicRoute={dynamicRouteCategory} />
							</Col>
							<Col xs={12} md={8} lg={9} style={{ position: "relative" }}>
								{!!categoryProducts.data?.products?.length ? (
									<CategoryProductsList productsCategoryData={categoryProducts.data} setPageNumber={setPageNumber} />
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
						</>
					)}
				</Row>
			</Container>
		</>
	);
};

export default CategoryProductsPage;
