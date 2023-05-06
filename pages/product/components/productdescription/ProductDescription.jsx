import { SectionLayout } from "@root/components/layout";
import parse from "html-react-parser";

import style from "./productdescription.module.scss";

const ProductDescription = ({ productDescription }) => {
	return (
		productDescription && (
			<SectionLayout title="وصف المنتج" isContainerDisable={true}>
				<div className={style.productDescriptionWrapper}>
					<p className={style.productDescription}>{parse(productDescription)}</p>
				</div>
			</SectionLayout>
		)
	);
};

export default ProductDescription;
