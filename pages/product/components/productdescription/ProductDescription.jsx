import { useState, useEffect } from "react";
import { SectionLayout } from "@root/components/layout";

import parse from "html-react-parser";

import CircularProgress from "@mui/material/CircularProgress";

import style from "./productdescription.module.scss";

const ProductDescription = ({ productDescription }) => {
	const [productDescriptionParsed, setProductDescriptionParsed] = useState("");
	const [isLoadingLongDescription, setIsLoadingLongDescription] = useState(true);
	useEffect(() => {
		setIsLoadingLongDescription(false);
		setProductDescriptionParsed(productDescription);
	}, [setProductDescriptionParsed, setIsLoadingLongDescription]);
	return (
		productDescription && (
			<SectionLayout title="وصف المنتج" isContainerDisable={true}>
				<div className={style.productDescriptionWrapper}>
					<p className={style.productDescription}>{isLoadingLongDescription ? <CircularProgress size={20} /> : parse(productDescriptionParsed)}</p>
				</div>
			</SectionLayout>
		)
	);
};

export default ProductDescription;
