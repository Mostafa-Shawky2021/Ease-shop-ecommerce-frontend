import Image from "next/image";
import Link from "next/link";

import { useLayoutData } from "@root/hooks";

import { Autoplay, EffectFade, Navigation } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

import { Container } from "react-bootstrap";
import parse from "html-react-parser";

import Carousel1 from "@assets/images/homeslider/img1.jpg";
import Carousel2 from "@assets/images/homeslider/img2.jpg";
import Carousel3 from "@assets/images/homeslider/img3.jpg";
import Carousel4 from "@assets/images/homeslider/img4.jpg";
import Carousel5 from "@assets/images/homeslider/img5.jpg";

import "swiper/css/effect-fade";
import style from "./carousel.module.scss";

const Carousel = () => {
	const { data: carouselData } = useLayoutData();

	const renderCarouselContent = () => {
		const carouselContentApiData = carouselData?.data?.carousel_content?.content || "";

		const carouselContentData = carouselContentApiData && parse(carouselData?.data?.carousel_content?.content);

		if (!!carouselContentData) return <div className={style.description}>{carouselContentData}</div>;

		// default content
		return (
			<>
				<h1 className={style.title}>
					خصومات تصل لاكثر من <span className={style.discount}>40%</span>
				</h1>
				<p className={style.description}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero ratione voluptatum possimus similique dolore obcaecati omnis numquam repudiandae repellendus, quis dignissimos quasi mollitia minus molestias? Illum fuga sint perspiciatis vel?</p>
			</>
		);
	};

	const carouselTime = () => (carouselData?.data?.carousel_content?.carousel_time || 15) * 1000;

	const renderCarouselImages = () => {
		const carouselImages = carouselData?.data?.carousel_content?.images;
		const defaultImages = [Carousel1, Carousel2, Carousel3, Carousel4, Carousel5];
		if (!!carouselImages?.length) {
			return carouselImages.map((image) => (
				<SwiperSlide key={image.id} className={style.sliderImage}>
					<Image fill className={style.image} style={{ objectFit: "cover" }} src={image.url} alt="carousel-image" />
				</SwiperSlide>
			));
		}
		return (
			// default images in case no data from api
			<>
				{defaultImages.map((imageSrc, index) => (
					<SwiperSlide key={index} className={style.sliderImage}>
						<Image fill style={{ objectFit: "cover", objectPosition: "center", zIndex: "-2" }} src={imageSrc} alt="slider" />
					</SwiperSlide>
				))}
			</>
		);
	};

	return (
		<div className={style.carouselWrapper}>
			<Container fluid="xl" style={{ position: "relative", height: "100%" }}>
				<div className={style.intro}>
					{renderCarouselContent()}
					<Link href="/store" className={style.buttonShopNow} style={{ display: "block" }}>
						<span className={style.text}>تسوق الأن</span>
					</Link>
				</div>
			</Container>

			<Swiper style={{ direction: "rtl" }} grabCursor={true} autoplay={{ delay: carouselTime() }} pagination={{ clickable: false }} className={style.swiper} slidesPerView={1} loop={true} modules={[Autoplay, EffectFade, Navigation]} effect={"fade"}>
				{renderCarouselImages()}
			</Swiper>
		</div>
	);
};
export default Carousel;
