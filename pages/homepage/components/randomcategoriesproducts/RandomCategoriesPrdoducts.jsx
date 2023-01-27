import { ProductCard } from '@root/components/cards';
import { Container, Row, Col } from 'react-bootstrap';

import { SectionLayout } from '@root/components/layout';

import style from './randomcategoriesproducts.module.scss';

const RandomCategoriesProducts = ({ randomCategoriesProductsData }) => {

    return (
        <div className={style.randomCategoriesProductsWrapper}>
            {randomCategoriesProductsData?.map((randomCat) => (

                <SectionLayout
                    key={randomCat.id}
                    title={randomCat?.cat_name}
                    isSwiper={false}>
                    <Row>
                        {randomCat.products?.map((product) => (
                            <Col
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                key={product.id}
                                style={{ marginTop: '1.2rem' }}
                            >
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                </SectionLayout>




            ))}

        </div>
    )
}

export default RandomCategoriesProducts;