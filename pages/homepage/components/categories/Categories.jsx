import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useCategoriesData } from "@root/hooks";

import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { SectionLayout } from "@root/components/layout";

import DefaultImage from "@assets/images/default/default.jpg";

import "swiper/css/pagination";
import "swiper/css/navigation";

import style from "./categories.module.scss";

const Categories = () => {
	const [_, setSwiper] = useState();

	const { data: categoriesData } = useCategoriesData();

	return (
		!!categoriesData && (
			<div className={style.categories}>
				<SectionLayout title="الاقسام" isSwiper={true} link="/categories">
					{(nextElementRef, prevElementRef) => (
						<Swiper
							style={{ direction: "rtl" }}
							modules={[Autoplay, Navigation]}
							pagination={{ clickable: true }}
							className={style.swiperWrapper}
							autoplay={{ delay: 4000 }}
							allowTouchMove={true}
							navigation={{
								prevEl: prevElementRef.current,
								nextEl: nextElementRef.current,
							}}
							slidesPerView={"auto"}
							loop={false}
							spaceBetween={18}
							onSwiper={setSwiper}
						>
							{categoriesData?.map((category) => (
								<SwiperSlide key={category.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
									<div className={style.catWrapper} style={{ marginTop: "1rem" }}>
										<div className={style.catImageWrapper}>
											<Link href={`categoryproducts/${category.cat_slug}`}>
												<Image
													src={category?.image ? `${category?.image}` : DefaultImage}
													className={style.catImage}
													fill
													alt={category.cat_name}
												/>
											</Link>
										</div>
										<Link href={`categoryproducts/${category.cat_slug}`} className={style.catName}>
											{category.cat_name}{" "}
										</Link>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					)}
				</SectionLayout>
			</div>
		)
	);
};
export default Categories;
