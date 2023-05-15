import { dehydrate, QueryClient } from "@tanstack/react-query";

import { useCategoriesData } from "@root/hooks";

import { fetchCategories } from "@root/queries";

import { Container, Col } from "react-bootstrap";
import { BreadCrumbLayout } from "@root/components/layout";
import { GridList } from "@root/components/gridlist";

import { queryKeys } from "data";
import { Loading } from "@root/components/loading";
import { Seek } from "react-loading-indicators";
import { CategoryItem } from "./components/categoryitem";

export async function getServerSideProps() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(queryKeys.CATEGORIES, fetchCategories);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}

export default function CategoriesPage() {
	const categoriesData = useCategoriesData();

	const breadCrumbData = [
		{ label: "الصفحة الرئيسية", link: "/" },
		{ label: "الاقسام", active: true },
	];

	return (
		<>
			<BreadCrumbLayout data={breadCrumbData} />
			<Container fluid="lg" style={{ marginTop: "2.5rem", minHeight: "300px", position: "relative" }}>
				{categoriesData.isLoading ? (
					<Loading isOpacity={true}>
						<Seek color="#ffb700" size="medium" />
					</Loading>
				) : (
					<GridList
						data={categoriesData.data}
						renderItem={(category) => (
							<Col xs={12} sm={6} md={4} key={category.id}>
								<CategoryItem categoryData={category} />
							</Col>
						)}
					/>
				)}
			</Container>
		</>
	);
}
