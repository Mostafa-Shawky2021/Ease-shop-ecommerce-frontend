import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { dehydrate, QueryClient } from "@tanstack/react-query";

import { useProductsBestSeller } from "./hooks";

import { fetchProductsBestSeller } from "./queries";

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

	await queryClient.prefetchQuery(queryKeys.BEST_SELLER(1, filterQueryString), () => fetchProductsBestSeller(1, filterQueryString));

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}

const LatestProdutsPage = () => {
	const [pageNumber, setPageNumber] = useState(1);

	const router = useRouter();

	const bestseller = useProductsBestSeller(pageNumber, router.query);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pageNumber]);

	const breadCrumbData = [
		{ label: "الصفحة الرئيسية", link: "/" },
		{ label: "الأكثر مبيعاً", active: true },
	];

	return (
		<>
			<BreadCrumbLayout data={breadCrumbData} />
			<Container fluid="xxl" style={{ position: "relative", minHeight: "70vh" }}>
				{bestseller.isLoading ? (
					<Loading isOpacity={false}>
						<Seek color="#0d6efd" size="small" style={{ marginTop: "3rem" }} />
					</Loading>
				) : (
					<Row className="g-0">
						<Col xs={12} md={4} lg={3}>
							<SidebarFilter pageNumber={pageNumber} />
						</Col>
						<Col xs={12} md={8} lg={9} style={{ position: "relative" }}>
							{bestseller?.data?.products ? (
								<ProductsList productsData={bestseller.data} setPageNumber={setPageNumber} />
							) : (
								// the best seller is empty
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

export default LatestProdutsPage;
