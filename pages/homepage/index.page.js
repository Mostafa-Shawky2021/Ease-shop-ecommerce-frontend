
import { Header } from '@root/components/header'
import { Menu } from '@root/components/menu'
import { Carousel } from './components/carousel'
import { Services } from './components/services'
import { TopCategories } from './components/topcategories'
import { Categories } from './components/categories'
import { LatestProducts } from './components/latestproducts'

import { dehydrate, QueryClient } from '@tanstack/react-query';

import {
    fetchLatestProducts,
    fetchRandomCategoriesProducts,
    fetchCategories
} from './queries'
import { queryKeys } from './data'
import {
    useCategoriesData,
    useLatestProductsData,
    useRandomCategoriesProductsData
} from './hooks'

import RandomCategoriesProducts from './components/randomcategoriesproducts/RandomCategoriesPrdoducts'
import { ToastContainer } from 'react-toastify'
import { Offer } from './components/offer'



export async function getStaticProps() {
    const queryClient = new QueryClient()
    await Promise.all(
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

    const { data: latestProducts } = useLatestProductsData();
    const { data: randomCategoriesProducts } = useRandomCategoriesProductsData();
    const { data: categories } = useCategoriesData();


    return (
        <>
            <Carousel />
            <TopCategories />
            {/* <Offer /> */}
            <Categories categoriesData={categories} />
            <LatestProducts latestProductsData={latestProducts} />
            <RandomCategoriesProducts randomCategoriesProductsData={randomCategoriesProducts} />
            <Services />
            <ToastContainer />


        </>
    )
}