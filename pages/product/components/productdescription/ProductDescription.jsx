import { useState, useEffect } from "react";
import { SectionLayout } from "@root/components/layout";
import parse from "html-react-parser";

import style from "./productdescription.module.scss";

const ProductDescription = ({ productDescription }) => {
	const [productDescriptionParsed, setProductDescriptionParsed] = useState("");
	useEffect(() => setProductDescriptionParsed(productDescription), [setProductDescriptionParsed]);
	return (
		productDescription && (
			<SectionLayout title="وصف المنتج" isContainerDisable={true}>
				<div className={style.productDescriptionWrapper}>
					<p className={style.productDescription}>{parse(productDescriptionParsed)}</p>
				</div>
			</SectionLayout>
		)
	);
};

export default ProductDescription;
