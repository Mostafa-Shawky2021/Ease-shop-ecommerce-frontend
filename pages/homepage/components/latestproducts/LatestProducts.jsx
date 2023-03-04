import { useState } from 'react';

import { useProductsData } from '@root/hooks';

import { Row, Col } from 'react-bootstrap';
import { SectionLayout } from '@root/components/layout';
import { ProductCard } from '@root/components/cards';

import "swiper/css/pagination";
import "swiper/css/navigation";

import style from './latestproducts.module.scss';

const LatestProducts = () => {

    const [_, setSwiper] = useState(null)

    const { data: latestProducts } = useProductsData(1, { latest: true, limit: 8 });

    return (
        <div className={style.latestProducts}>
            <SectionLayout title="احدث المنتجات" link="/latestproducts">
                <Row>
                    {latestProducts.products?.map(product => (
                        <Col xs={12} sm={6} md={4} lg={3}>
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
            </SectionLayout>

        </div >
    )
}

export default LatestProducts