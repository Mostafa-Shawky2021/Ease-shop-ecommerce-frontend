import { Col } from "react-bootstrap";
import { GridList } from "@root/components/gridlist";
import { ProductCard } from "@root/components/cards";
import { PaginationWrapper } from "@root/components/paginationwrapper";
import { Loading } from "@root/components/loading";
import { Seek } from "react-loading-indicators";

import style from './products.module.scss';

const ProductsList = ({
    productsData,
    setPageNumber,
    isFetchingProducts
}) => {

    const { current_page, per_page, total } = productsData.meta_pagination;

    return (
        <div className={style.productsWrapper}>
            {isFetchingProducts &&
                <Loading isOpacity={true} >
                    <Seek color="#ffb700" size="medium" />
                </Loading>}
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



        </div>




    )
}
export default ProductsList