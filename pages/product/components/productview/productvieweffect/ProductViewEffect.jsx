import Image from "next/image";
import { useState, useRef } from "react";

import DefaultImage from "@assets/images/default/default.jpg";

import style from "./productvieweffect.module.scss";

const ProductViewEffect = ({ image, imagesThumbnails, imageAlt }) => {
	const [activeImageIndex, setActiveImageIndex] = useState(0);

	const imageThumbnailWrapperRef = useRef(null);

	const handleimageThumbnail = (event) => {
		const activeIndex = Number(event.currentTarget.getAttribute("data-index"));
		setActiveImageIndex(activeIndex);
	};

	return (
		<div className={style.productViewWrapper}>
			<div className={style.presentationImage}>
				<div className={`${style.image} ${activeImageIndex === 0 ? style.active : ""}`}>
					<Image fill style={{ objectFit: "contain" }} src={image ? `${image}` : DefaultImage} alt={imageAlt} />
				</div>
				{imagesThumbnails?.map((thumbnail, index) => {
					const activeImageIndexClass = activeImageIndex === index + 1 ? style.active : "";
					return (
						<div className={`${style.image} ${activeImageIndexClass}`} key={thumbnail.id}>
							<Image fill style={{ paddingLeft: "15px", paddingRight: "15px" }} src={thumbnail?.url ? thumbnail?.url : ""} alt={imageAlt} />
						</div>
					);
				})}
			</div>
			{/* image thumbnails */}
			<div className={style.imageThumbnailWrapper} ref={imageThumbnailWrapperRef}>
				<div className={`${style.thumbnail} ${0 === activeImageIndex ? style.active : ""}`} onClick={handleimageThumbnail} data-index={0}>
					<Image fill style={{ padding: "5px" }} src={image ? image : DefaultImage} alt={imageAlt} />
				</div>

				{imagesThumbnails?.map((thumbnail, index) => (
					<div className={`thumb ${style.thumbnail} ${index + 1 === activeImageIndex ? style.active : ""}`} key={thumbnail.id} data-index={index + 1} onClick={handleimageThumbnail}>
						<Image fill src={thumbnail?.url ? thumbnail?.url : ""} style={{ padding: "5px" }} alt={imageAlt} />
					</div>
				))}
			</div>
		</div>
	);
};

export default ProductViewEffect;
