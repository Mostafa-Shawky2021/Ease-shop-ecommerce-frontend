import { Col } from 'react-bootstrap';
import { PaginationWrapper } from '@root/components/paginationwrapper';
import { ProductCard } from '@root/components/cards';
import { GridList } from '@root/components/gridlist';
import { Loading } from '@root/components/loading';

import style from './categoryproductslist.module.scss';

const CategoryProductsList = ({
    productsCategoryData,
    isFetchingProductsCategory,
    isLoadingProductsCategory,
    setPageNumber
}) => {

    const { current_page, per_page, total } = productsCategoryData.meta_pagination;

    return (
        <div className={style.categoryProductsWrapper}>
            {isFetchingProductsCategory || isLoadingProductsCategory ? <Loading /> : ''}
            <GridList
                data={productsCategoryData?.products}
                renderItem={(product) => (
                    <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
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

        </div>
    )
}

export default CategoryProductsList;