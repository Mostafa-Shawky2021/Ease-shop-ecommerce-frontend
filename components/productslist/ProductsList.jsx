import { Col } from "react-bootstrap";
import { GridList } from "@root/components/gridlist";
import { ProductCard } from "@root/components/cards";
import { PaginationWrapper } from "@root/components/paginationwrapper";
import { Loading } from "@root/components/loading";

import style from "./products.module.scss";

const ProductsList = ({ productsData, setPageNumber, isFetchingProducts }) => {
	const { current_page, per_page, total } = productsData.meta_pagination;

	return (
		<div className={style.productsWrapper} style={{ position: "relative" }}>
			<GridList
				data={productsData?.products}
				renderItem={(product) => (
					<Col xs={12} md={6} lg={4} xxl={3} key={product.id}>
						<ProductCard product={product} style={{ marginTop: "3rem" }} />
					</Col>
				)}
			/>

			<PaginationWrapper activePage={current_page} itemsCountPerPage={per_page} totalItemsCount={total} pageRangeDisplayed={5} onChange={(page) => setPageNumber(page)} />
		</div>
	);
};
export default ProductsList;
