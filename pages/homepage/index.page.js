import { dehydrate, QueryClient } from '@tanstack/react-query';

import {
    fetchRandomCategoriesProducts,
    fetchCategories
} from './queries';

import { fetchProducts } from '@root/queries';

import { Carousel } from './components/carousel'
import { Services } from './components/services'
import { Categories } from './components/categories'
import { LatestProducts } from './components/latestproducts'
import { TopCategories } from './components/topcategories';
import { RandomCategoriesProducts } from './components/randomcategoriesproducts';
import { Offer } from './components/offer';
import { ProductsOffers } from './components/productsoffers';

import { queryKeys } from './data'
import { queryKeys as globalQueryKeys } from 'data';

export async function getServerSideProps() {

    const queryClient = new QueryClient();

    await Promise.allSettled(
        [
            queryClient.prefetchQuery(
                globalQueryKeys.PRODUCTS(1, "latest=true&limit=8"),
                () => fetchProducts(1, "latest=true&limit=8")),
            queryClient.prefetchQuery(
                queryKeys.RANDOM_CATEGORIES_PRODUCTS,
                fetchRandomCategoriesProducts),
            queryClient.prefetchQuery(
                queryKeys.CATEGORIES,
                fetchCategories),
            queryClient.prefetchQuery(
                globalQueryKeys.PRODUCTS(1, "offers=true&latest=true&limit=8"),
                () => fetchProducts(1, "offers=true&latest=true&limit=8"),
            )
        ]);


    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        },
    }
}
export default function HomePage() {

    return (
        <>
            <Carousel />
            <Services />
            <Categories />
            <LatestProducts />
            <Offer />
            <ProductsOffers />
            <RandomCategoriesProducts />
            <TopCategories />
        </>
    )
}