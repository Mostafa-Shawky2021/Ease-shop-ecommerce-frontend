import { dehydrate, QueryClient } from '@tanstack/react-query';

import {
    fetchLatestProducts,
    fetchRandomCategoriesProducts,
    fetchCategories
} from './queries'

import { queryKeys } from './data'

import { Carousel } from './components/carousel'
import { Services } from './components/services'
import { TopCategories } from './components/topcategories'
import { Categories } from './components/categories'
import { LatestProducts } from './components/latestproducts'
import { RandomCategoriesProducts } from './components/randomcategoriesproducts';
import { ToastContainer } from 'react-toastify';
import { Offer } from './components/offer';

export async function getServerSideProps() {

    const queryClient = new QueryClient()
    await Promise.allSettled(
        [
            queryClient.prefetchQuery(
                queryKeys.LATEST_PRODUCTS,
                fetchLatestProducts),
            queryClient.prefetchQuery(
                queryKeys.RANDOM_CATEGORIES_PRODUCTS,
                fetchRandomCategoriesProducts),
            queryClient.prefetchQuery(
                queryKeys.CATEGORIES,
                fetchCategories),
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
            <LatestProducts />
            <Categories />
            {/* <TopCategories /> */}
            <Offer />
            <RandomCategoriesProducts />
            <ToastContainer />
        </>
    )
}