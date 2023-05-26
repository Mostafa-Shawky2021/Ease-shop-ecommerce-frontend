import Image from "next/image";
import { useState, useRef } from "react";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import DefaultImage from "@assets/images/default/default.jpg";

import style from "./productvieweffect.module.scss";

const ProductViewEffect = ({ image, imagesThumbnails, imageAlt }) => {
	const [activeImageIndex, setActiveImageIndex] = useState(0);
	const [_, setSwiper] = useState(null);

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
							<Image
								fill
								style={{ paddingLeft: "15px", paddingRight: "15px" }}
								src={thumbnail?.url ? thumbnail?.url : ""}
								alt={imageAlt}
							/>
						</div>
					);
				})}
			</div>
			{/* image thumbnails */}
			<div className={style.imageThumbnailWrapper} ref={imageThumbnailWrapperRef}>
				<Swiper
					style={{ direction: "rtl", margin: "0px" }}
					className={style.swiperWrapper}
					allowTouchMove={true}
					slidesPerView={"auto"}
					spaceBetween={10}
					grabCursor={true}
					onSwiper={setSwiper}
				>
					<SwiperSlide className={`${style.thumbnail} ${0 === activeImageIndex ? style.active : ""}`}>
						<div onClick={handleimageThumbnail} data-index={0}>
							<Image fill style={{ padding: "5px" }} src={image ? image : DefaultImage} alt={imageAlt} />
						</div>
					</SwiperSlide>
					{imagesThumbnails?.map((thumbnail, index) => (
						<SwiperSlide
							key={thumbnail.id}
							className={`${style.thumbnail} ${index + 1 === activeImageIndex ? style.active : ""}`}
						>
							<div
								className={index + 1 === activeImageIndex ? style.active : ""}
								data-index={index + 1}
								onClick={handleimageThumbnail}
							>
								<Image fill src={thumbnail?.url ? thumbnail?.url : ""} style={{ padding: "5px" }} alt={imageAlt} />
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default ProductViewEffect;
