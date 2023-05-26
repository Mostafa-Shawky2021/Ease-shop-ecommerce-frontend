import { useState } from "react";

import { useRandomCategoriesProductsData } from "../../hooks";

import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { SectionLayout } from "@root/components/layout";
import { ProductCard } from "@root/components/cards";

import "swiper/css/pagination";
import "swiper/css/navigation";

import style from "./randomcategoriesproducts.module.scss";

const RandomCategoriesProducts = () => {
	const [swiper, setSwiper] = useState(null);

	const { data: randomCategoriesProducts } = useRandomCategoriesProductsData();

	return (
		!!randomCategoriesProducts?.data && (
			<div className={style.randomCategoriesProductsWrapper}>
				{randomCategoriesProducts?.data?.map((randomCat) => (
					<SectionLayout
						key={randomCat.id}
						title={randomCat?.cat_name}
						link={`/categoryproducts/${randomCat.cat_slug}`}
						isSwiper={true}
					>
						{(nextElementRef, prevElementRef) => (
							<Swiper
								style={{ direction: "rtl" }}
								modules={[Navigation, Autoplay]}
								className={style.swiperWrapper}
								navigation={{
									prevEl: nextElementRef.current,
									nextEl: prevElementRef.current,
								}}
								autoplay={{ delay: 4000 }}
								allowTouchMove={true}
								slidesPerView={"auto"}
								loop={false}
								spaceBetween={18}
								onSwiper={setSwiper}
							>
								{randomCat?.products?.map((product) => (
									<SwiperSlide key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
										<ProductCard product={product} />
									</SwiperSlide>
								))}
							</Swiper>
						)}
					</SectionLayout>
				))}
			</div>
		)
	);
};
export default RandomCategoriesProducts;
