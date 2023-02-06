import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Col } from 'react-bootstrap';
import Pagination from "react-js-pagination";

import { GridList } from '@root/components/gridlist';
import { ProductCard } from '@root/components/cards';

import { useCategoryProductsData } from '../../hooks';

import style from './categoryproductslist.module.scss';
import { Loading } from '@root/components/loading';
import { Commet } from 'react-loading-indicators';

const CategoryProductsList = () => {

    const [pageNumber, setPageNumber] = useState(1)

    const { query: { categorySlug } } = useRouter();

    const { data: categoryProducts, isLoading, isFetching } = useCategoryProductsData(categorySlug, pageNumber);

    const { current_page, per_page, total } = categoryProducts.meta_pagination;

    useEffect(() => {

        window.scrollTo(0, 0);

    }, [pageNumber])

    return (
        <div className={style.categoryProductsWrapper}>
            {isFetching || isLoading ? <Loading /> : ''}
            {!!categoryProducts.products.length ? (
                <>
                    <GridList
                        data={categoryProducts?.products}
                        renderItem={(product) => (
                            <Col xs={12} sm={6} md={4} key={product.id}>
                                <ProductCard
                                    product={product}
                                    style={{ marginTop: '1rem' }} />
                            </Col>
                        )}
                    />
                    <Pagination
                        activePage={current_page}
                        itemsCountPerPage={per_page}
                        totalItemsCount={total}
                        pageRangeDisplayed={5}
                        onChange={(page) => setPageNumber(page)}
                        innerClass={style.paginationWrapper}
                        linkClass={style.pageItem}
                        activeLinkClass={style.activePage}
                        itemClassFirst={style.firstItem}
                        itemClassLast={style.lastItem} />
                </>)
                : (<p>لا يوجد منتجات لعرضها في هذا القسم</p>)}

        </div>
    )
}

export default CategoryProductsList;