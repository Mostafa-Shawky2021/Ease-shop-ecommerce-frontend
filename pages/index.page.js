import React, { useContext } from "react";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import { fetchCategories, fetchLayout, fetchProducts } from "@root/queries";
import { fetchRandomCategoriesProducts } from "./homepage/queries";

import { Carousel } from "./homepage/components/carousel";
import { Services } from "./homepage/components/services";
import { Categories } from "./homepage/components/categories";
import { LatestProducts } from "./homepage/components/latestproducts";
import { TopCategories } from "./homepage/components/topcategories";
import { RandomCategoriesProducts } from "./homepage/components/randomcategoriesproducts";
import { Offer } from "./homepage/components/offer";
import { ProductsOffers } from "./homepage//components/productsoffers";
import { BestSeller } from "./homepage/components/bestseller";

import { queryKeys } from "./homepage/data";
import { queryKeys as globalQueryKeys } from "data";
import { ThemeProvider } from "react-bootstrap";

export async function getStaticProps() {
	const queryClient = new QueryClient();

	await Promise.allSettled([
		queryClient.prefetchQuery(globalQueryKeys.LAYOUT, fetchLayout),
		queryClient.prefetchQuery(globalQueryKeys.PRODUCTS(1, "latest=true&limit=8"), () => fetchProducts(1, "latest=true&limit=8")),
		queryClient.prefetchQuery(queryKeys.RANDOM_CATEGORIES_PRODUCTS, fetchRandomCategoriesProducts),
		queryClient.prefetchQuery(queryKeys.CATEGORIES, fetchCategories),
		queryClient.prefetchQuery(globalQueryKeys.PRODUCTS(1, "offers=true&latest=true&limit=8"), () => fetchProducts(1, "offers=true&latest=true&limit=8")),
		queryClient.prefetchQuery(globalQueryKeys.PRODUCTS(1, "best-seller=true&limit=8"), () => fetchProducts(1, "best-seller=true&limit=8")),
	]);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}

export default function HomePage() {
	return (
		<>
			<Carousel />
			<Services />
			<Offer />
			<BestSeller />
			<Categories />
			{/* <TopCategories /> */}
			<LatestProducts />
			<ProductsOffers />
			<RandomCategoriesProducts />
		</>
	);
}
