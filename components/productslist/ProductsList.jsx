import { Col } from "react-bootstrap";
import { GridList } from "@root/components/gridlist";
import { ProductCard } from "@root/components/cards";
import { PaginationWrapper } from "@root/components/paginationwrapper";
import { Loading } from "@root/components/loading";

import style from './products.module.scss';

const ProductsList = ({
    productsData,
    isFetchingProducts,
    isLoadingProducts,
    setPageNumber
}) => {

    const { current_page, per_page, total } = productsData.meta_pagination;

    return (
        <div className={style.productsWrapper}>
            {isFetchingProducts || isLoadingProducts ? <Loading /> : ''}
            {!!productsData.products.length ? (<>
                <GridList
                    data={productsData?.products}
                    renderItem={(product) =>
                        <Col xs={6} md={4} key={product.id}>
                            <ProductCard
                                product={product}
                                style={{ marginTop: '2rem' }} />
                        </Col>} />
                <PaginationWrapper
                    activePage={current_page}
                    itemsCountPerPage={per_page}
                    totalItemsCount={total}
                    pageRangeDisplayed={5}
                    onChange={(page) => setPageNumber(page)} />
            </>

            ) : (<p> لا يوجد منتجات لعرضها</p>)}

        </div>




    )
}
export default ProductsList