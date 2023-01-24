import { useContext } from 'react'

import { Header } from '@root/components/header'
import { Carousel } from './components/carousel'
import { Services } from './components/services'
import { TopCategories } from './components/topcategories'
import { Categories } from './components/categories'
import { LatestProducts } from './components/latestproducts'

import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

import { fetchLatestProducts } from './queries'
import { queryKeys } from './data'
import { useLatestProductsData } from './hooks'

import { CartContext } from 'context'



export async function getServerSideProps() {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(queryKeys.LATEST_PRODUCTS, fetchLatestProducts)
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        },
    }
}
export default function HomePage() {

    const { data } = useLatestProductsData();

    return (
        <>
            <Header />
            <Carousel />
            <TopCategories />
            <Categories />
            <LatestProducts data={data} />
            <Services />
        </>
    )
}