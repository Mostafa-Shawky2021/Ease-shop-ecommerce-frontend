import { useProductsData } from "@root/hooks";

import { Col, Row } from "react-bootstrap";
import { SectionLayout } from "@root/components/layout";
import { ProductCard } from "@root/components/cards";

import style from "./bestseller.module.scss";

const BestSeller = () => {
	const { data: bestSellerProducts } = useProductsData(1, { "best-seller": true, limit: 8 });

	return (
		!!bestSellerProducts?.products && (
			<div className={style.bestSeller}>
				<SectionLayout title="الأكثر مبيعاً" link="/bestseller">
					<Row>
						{bestSellerProducts?.products?.map((product) => (
							<Col key={product.id} xs={12} sm={6} md={4} lg={3}>
								<ProductCard product={product} />
							</Col>
						))}
					</Row>
				</SectionLayout>
			</div>
		)
	);
};

export default BestSeller;
