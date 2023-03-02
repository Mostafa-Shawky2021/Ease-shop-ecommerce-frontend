import { useState } from 'react';

import { useRandomCategoriesProductsData } from '../../hooks';

import { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";

import { SectionLayout } from '@root/components/layout';
import { ProductCard } from '@root/components/cards';


import "swiper/css/pagination";
import "swiper/css/navigation";

import style from './randomcategoriesproducts.module.scss';

const RandomCategoriesProducts = () => {

    const [swiper, setSwiper] = useState(null)

    const { data: randomCategoriesProducts } = useRandomCategoriesProductsData();
    return (
        <div className={style.randomCategoriesProductsWrapper}>

            {randomCategoriesProducts?.map((randomCat) => (
                <SectionLayout
                    key={randomCat.id}
                    title={randomCat?.cat_name}
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
                            breakpoints={{
                                0: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                992: { slidesPerView: 4 },
                                1400: { slidesPerView: 5 }
                            }}
                            loop={false}
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