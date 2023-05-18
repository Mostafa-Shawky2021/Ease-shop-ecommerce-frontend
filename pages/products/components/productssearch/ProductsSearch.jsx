import { ProductCard } from "@root/components/cards";
import { GridList } from "@root/components/gridlist";
import { PaginationWrapper } from "@root/components/paginationwrapper";
import { Col } from "react-bootstrap";

import style from "./productssearch.module.scss";

const ProductsSearch = ({ products, setPageNumber }) => {
	const { current_page, per_page, total } = products?.meta_pagination;

	return (
		<div className={style.productsSearchWrapper}>
			<GridList
				data={products?.products}
				renderItem={(product) => (
					<Col xs={12} sm={6} md={4} key={product.id}>
						<ProductCard product={product} style={{ marginTop: "1rem" }} />
					</Col>
				)}
			/>
			<PaginationWrapper activePage={current_page} itemsCountPerPage={per_page} totalItemsCount={total} pageRangeDisplayed={5} onChange={(page) => setPageNumber(page)} />
		</div>
	);
};

export default ProductsSearch;
