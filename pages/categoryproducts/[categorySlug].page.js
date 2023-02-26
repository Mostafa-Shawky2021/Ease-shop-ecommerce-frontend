import { useEffect, useState } from "react";


import { dehydrate, QueryClient } from "@tanstack/react-query";

import { axiosInstance } from "lib";

import { useRouter } from 'next/router';
import { useCategoryProductsData } from "./hooks";

import { fetchCategoryProducts } from "./queries";

import { Container, Col, Row } from "react-bootstrap";
import { CategoryProductsList } from "./components/categoryproductslist";
import { Sidebar } from "@root/components/sidebar"

import { queryKeys } from "./data";



export const getServerSideProps = async ({ query }) => {

    const queryClient = new QueryClient();

    const catSlug = query.categorySlug;

    const urlSearchParams = new URLSearchParams();

    // exclude page number from query paramters
    Object.entries(query).forEach(([queryStringKey, queryStringValue]) => {

        if (queryStringKey !== 'page' && queryStringKey !== 'categorySlug') {
            urlSearchParams.set(queryStringKey, encodeURIComponent(queryStringValue));
        }
    })

    const urlSearchParamsToString = urlSearchParams.toString();

    await queryClient.prefetchQuery(
        queryKeys.CATEGORY_PRODUCTS(1, catSlug, urlSearchParamsToString),
        () => fetchCategoryProducts(1, catSlug, urlSearchParamsToString)
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        },
    }
}
const CategoryProductsPage = () => {

    const [pageNumber, setPageNumber] = useState(1);
    const [filterRules, setFilterRules] = useState({
        price: [50, 3000],
        sizes: [],
        colors: [],
    });
    const router = useRouter();


    const {
        data: productsCategory,
        isFetching: isFetchingProductsCategory,
        isLoadingProductsCategory: isLoadingProductsCategory
    } = useCategoryProductsData(pageNumber, router.query)

    useEffect(() => {

        window.scrollTo(0, 0);

    }, [pageNumber])

    const handleFilter = () => {

        const urlSearchParams = new URLSearchParams()

        Object.entries(filterRules).forEach(([filterKey, value]) => {
            if (value.length > 0) {
                urlSearchParams.set(filterKey, encodeURIComponent(value.join('-')));
            }
        });

        const urlSearchParamsToString = urlSearchParams.toString();

        const filterUrl = `/caegoryproducts/${categorySlug}?page=${pageNumber}&${urlSearchParamsToString}`;

        router.push(filterUrl, undefined, { shallow: true });
    }

    const handleDeleteFilter = () => {
        setFilterRules({
            price: [50, 3000],
            sizes: [],
            colors: [],
        })
        router.push(`/categoryproducts/${categorySlug}`, undefined, { shallow: true });
    }

    return (
        <Container fluid="xl" style={{ marginTop: "2.8rem" }}>
            <Row className='g-0'>
                <Col xs={3} className='d-none d-lg-block' >
                    <Sidebar
                        setFilterRules={setFilterRules}
                        filterRules={filterRules}
                        handleFilter={handleFilter}
                        handleDeleteFilter={handleDeleteFilter}
                    />
                </Col>
                <Col xs={12} lg={9} style={{ position: 'relative' }}>
                    {productsCategory?.products ?
                        <CategoryProductsList
                            productsCategoryData={productsCategory}
                            isFetchingProductsCategory={isFetchingProductsCategory}
                            isLoadingProductsCategory={isLoadingProductsCategory}
                            setPageNumber={setPageNumber}
                        />
                        : (
                            <p>لا يوجد بيانات للعرض</p>
                        )
                    }

                </Col>
            </Row>
        </Container>
    )
}

export default CategoryProductsPage;