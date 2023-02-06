import React, { useState } from 'react';

import { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";

import { SectionLayout } from '@root/components/layout';
import { ProductCard } from '@root/components/cards';


import "swiper/css/pagination";
import "swiper/css/navigation";
import style from './randomcategoriesproducts.module.scss';

const RandomCategoriesProducts = ({ randomCategoriesProductsData }) => {

    const [swiper, setSwiper] = useState(null)

    return (
        <div className={style.randomCategoriesProductsWrapper}>

            {randomCategoriesProductsData?.map((randomCat) => (
                <SectionLayout
                    key={randomCat.id}
                    title={randomCat?.cat_name}
                    isSwiper={true}
                    link={`/categoryproducts/${randomCat?.cat_slug}`}
                >
                    {(nextElementRef, prevElementRef) => (
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            className={style.swiperWrapper}
                            slidesPerView="auto"
                            navigation={{
                                prevEl: nextElementRef.current,
                                nextEl: prevElementRef.current,
                            }}
                            autoplay={{ delay: 4000 }}
                            centeredSlides={true}
                            breakpoints={{
                                0: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                992: { slidesPerView: 5 },
                            }}
                            loop={true}
                            spaceBetween={18}
                            onSwiper={setSwiper}
                        >
                            {randomCat.products?.map(product => (
                                <SwiperSlide key={product.id}>
                                    <ProductCard product={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </SectionLayout>
            ))}
        </div>
    )
}
export default RandomCategoriesProducts;