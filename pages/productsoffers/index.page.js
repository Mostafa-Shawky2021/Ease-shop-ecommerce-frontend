import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { dehydrate, QueryClient } from "@tanstack/react-query";

import { useProductsOffersData } from "./hooks";

import { fetchProductsOffers } from "./queries";

import { generateQueryStringFilter } from "@root/utils";

import { Container, Row, Col } from "react-bootstrap";
import { SidebarFilter } from "@root/components/sidebars/sidebarfilter";
import { Loading } from "@root/components/loading";
import { Seek } from "react-loading-indicators";
import { BreadCrumbLayout } from "@root/components/layout";
import { ProductsList } from "@root/components/productslist";

import { queryKeys } from "./data";

export async function getServerSideProps({ query }) {
	const queryClient = new QueryClient();

	let filterQueryString = "";
	filterQueryString =
		Object.keys(query).length > 0
			? generateQueryStringFilter(query) // if the uri contain filter rule string
			: "";

	await queryClient.prefetchQuery(queryKeys.PRODUCTS_OFFERS(1, filterQueryString), () => fetchProductsOffers(1, filterQueryString));

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}

const ProductsOffers = () => {
	const [pageNumber, setPageNumber] = useState(1);

	const router = useRouter();
	const productsoffers = useProductsOffersData(pageNumber, router.query);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pageNumber]);

	const breadCrumbData = [
		{ label: "الصفحة الرئيسية", link: "/homepage" },
		{ label: "الاكثر مبيعاً", active: true },
	];

	return (
		<>
			<BreadCrumbLayout data={breadCrumbData} />
			<Container fluid="xxl">
				<Row className="g-0" style={{ position: "relative", minHeight: "300px" }}>
					{productsoffers.isLoading ? ( // for first time loading indicator
						<Loading isOpacity={true}>
							<Seek color="#ffb700" size="medium" />
						</Loading>
					) : (
						<>
							<Col xs={12} md={4} lg={3}>
								<SidebarFilter pageNumber={pageNumber} />
							</Col>
							<Col xs={12} md={8} lg={9} style={{ position: "relative" }}>
								{!!productsoffers.data?.products ? <ProductsList productsData={productsoffers.data} setPageNumber={setPageNumber} isFetchingProducts={productsoffers.isFetching} /> : <p>ليس متوفر عروض في الوقت الحالي</p>}
							</Col>
						</>
					)}
				</Row>
			</Container>
		</>
	);
};

export default ProductsOffers;
