import { ProductCard } from '@root/components/cards';
import { GridList } from '@root/components/gridlist';
import React from 'react'
import { Col } from 'react-bootstrap';

import style from './productssearch.module.scss';
const ProductsSearch = ({ products }) => {

    return (
        <div className={style.productsSearchWrapper}>
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
        </div>
    )
}

export default ProductsSearch