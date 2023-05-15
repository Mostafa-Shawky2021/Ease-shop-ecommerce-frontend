import { useEffect, useState } from "react";

import { dehydrate, QueryClient } from "@tanstack/react-query";

import { useRouter } from "next/router";

import { useCategoryProductsData } from "./hooks";

import { fetchCategoryProducts } from "./queries";

import { generateQueryStringFilter } from "@root/utils";

import { Container, Col, Row, Breadcrumb } from "react-bootstrap";
import { CategoryProductsList } from "./components/categoryproductslist";
import { SidebarFilter } from "@root/components/sidebars/sidebarfilter";

import { queryKeys } from "./data";
import { BreadCrumbLayout } from "@root/components/layout";

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

	const dynamicRouteCategory = { categorySlug: query.categorySlug };

	const { data: productsCategory, isFetching: isFetchingProductsCategory, isLoadingProductsCategory: isLoadingProductsCategory } = useCategoryProductsData(pageNumber, query);

	useEffect(() => {
		// window.scrollTo(0, 0);
	}, [pageNumber]);

	const breadCrumbData = [
		{ label: "الصفحة الرئيسية", link: "/" },
		{ label: query?.categorySlug, active: true },
	];

	return (
		<>
			<BreadCrumbLayout data={breadCrumbData} />
			<Container fluid="xxl" style={{ marginTop: "2.8rem" }}>
				<Row className="g-0">
					<Col xs={12} md={4} lg={3}>
						<SidebarFilter pageNumber={pageNumber} dynamicRoute={dynamicRouteCategory} />
					</Col>
					<Col xs={12} md={8} lg={9} style={{ position: "relative" }}>
						{productsCategory?.products ? <CategoryProductsList productsCategoryData={productsCategory} isFetchingProductsCategory={isFetchingProductsCategory} isLoadingProductsCategory={isLoadingProductsCategory} setPageNumber={setPageNumber} /> : <p>لا يوجد منتجات للعرض</p>}
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default CategoryProductsPage;
