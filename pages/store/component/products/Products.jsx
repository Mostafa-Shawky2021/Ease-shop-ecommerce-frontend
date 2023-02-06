import React, { useState, useEffect } from "react";
import { useProductsData } from "../../hooks"
import { Col } from "react-bootstrap";
import { GridList } from "@root/components/gridlist";
import { ProductCard } from "@root/components/cards";
import { PaginationWrapper } from "@root/components/paginationwrapper";
import { Loading } from "@root/components/loading";

import style from './products.module.scss';

const Products = () => {

    const [pageNumber, setPageNumber] = useState(1);

    const { data: products, isFetching, isLoading } = useProductsData(pageNumber);

    const { current_page, per_page, total } = products.meta_pagination;

    useEffect(() => {

        window.scrollTo(0, 0);

    }, [pageNumber])
    return (
        <div className={style.productsWrapper}>
            {isFetching || isLoading ? <Loading /> : ''}
            {!!products.products.length ? (<>
                <GridList
                    data={products?.products}
                    renderItem={(product) => (
                        <Col xs={12} sm={6} md={3} key={product.id}>
                            <ProductCard
                                product={product}
                                style={{ marginTop: '1rem' }} />
                        </Col>
                    )}
                />
                <PaginationWrapper
                    activePage={current_page}
                    itemsCountPerPage={per_page}
                    totalItemsCount={total}
                    pageRangeDisplayed={5}
                    onChange={(page) => setPageNumber(page)}
                />
            </>

            ) : (<p> لا يوجد منتجات لعرضها</p>)}

        </div>




    )
}
export default Products