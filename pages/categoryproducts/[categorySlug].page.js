import { useEffect, useState } from "react";

import { dehydrate, QueryClient } from "@tanstack/react-query";

import { useRouter } from 'next/router';

import { useCategoryProductsData } from "./hooks";

import { useFilter } from "@root/hooks";

import { fetchCategoryProducts } from "./queries";

import { generateQueryStringFilter } from "@root/utils";

import { Container, Col, Row, Breadcrumb } from "react-bootstrap";
import { CategoryProductsList } from "./components/categoryproductslist";
import { SidebarFilter } from "@root/components/sidebars/sidebarfilter"

import { queryKeys } from "./data";
import { BreadCrumbLayout } from "@root/components/layout";

export const getServerSideProps = async ({ query }) => {

    const queryClient = new QueryClient();


    const { categorySlug: catSlug, ...restQueryParamter } = query;

    const filterQueryString = Object.entries(restQueryParamter).length > 0
        ? generateQueryStringFilter(restQueryParamter)
        : '';


    await queryClient.prefetchQuery(
        queryKeys.CATEGORY_PRODUCTS(1, catSlug, filterQueryString),
        () => fetchCategoryProducts(1, catSlug, filterQueryString)
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        },
    }
}
const CategoryProductsPage = () => {

    const [pageNumber, setPageNumber] = useState(1);

    const router = useRouter();

    const {
        data: productsCategory,
        isFetching: isFetchingProductsCategory,
        isLoadingProductsCategory: isLoadingProductsCategory }
        = useCategoryProductsData(pageNumber, router.query)

    const { applyFilter, resetFilter } = useFilter(pageNumber);

    useEffect(() => {

        window.scrollTo(0, 0);

    }, [pageNumber])


    const handleFilter = (filterRules) => {

        const categoryName = router?.query?.categorySlug;
        applyFilter(filterRules, `/categoryproducts/${categoryName}`);
    }

    const handleDeleteFilter = (setFilterRules) => {

        const categorySlug = router.query.categorySlug;

        resetFilter(setFilterRules, `/categoryproducts/${categorySlug}`);

    }

    return (
        <>
            <BreadCrumbLayout>
                <Breadcrumb.Item href="/homepage">الصفحة الرئيسية</Breadcrumb.Item>
                <Breadcrumb.Item active style={{ color: 'var(--bs-primary)', fontWeight: '500' }}>
                    {router?.query?.categorySlug}
                </Breadcrumb.Item>
            </BreadCrumbLayout>
            <Container fluid="xxl" style={{ marginTop: "2.8rem" }}>
                <Row className='g-0'>
                    <Col xs={3} className='d-none d-lg-block' >
                        <SidebarFilter
                            handleFilter={handleFilter}
                            handleDeleteFilter={handleDeleteFilter} />
                    </Col>
                    <Col xs={12} lg={9} style={{ position: 'relative' }}>
                        {productsCategory?.products ?
                            <CategoryProductsList
                                productsCategoryData={productsCategory}
                                isFetchingProductsCategory={isFetchingProductsCategory}
                                isLoadingProductsCategory={isLoadingProductsCategory}
                                setPageNumber={setPageNumber} />
                            : (
                                <p>لا يوجد منتجات للعرض</p>
                            )}
                    </Col>
                </Row>
            </Container>
        </>

    )
}

export default CategoryProductsPage;