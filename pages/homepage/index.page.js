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
import { ToastContainer } from 'react-toastify';
import { Offer } from './components/offer';

import { queryKeys } from './data'
import { queryKeys as globalQueryKeys } from 'data';
import { ProductsOffers } from './components/productsoffers';


export async function getServerSideProps() {

    const queryClient = new QueryClient();



    await Promise.allSettled(
        [
            queryClient.prefetchQuery(
                globalQueryKeys.PRODUCTS(1, "latest=true&limit=8"),
                fetchProducts),
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
            <Offer />
            <Categories />
            <LatestProducts />
            <ProductsOffers />
            <RandomCategoriesProducts />
            {/* <TopCategories /> */}
            <ToastContainer
                position="top-center"
                autoClose={1000}
                limit={1}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}