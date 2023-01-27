import { useState } from 'react'

import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";

import { SectionLayout } from '@root/components/layout';
import { ProductCard } from '@root/components/cards';

import "swiper/css/pagination";
import "swiper/css/navigation";

import style from './latestproducts.module.scss';

const LatestProducts = ({ latestProductsData }) => {

    const [swiper, setSwiper] = useState(null)

    return (
        <div className={style.latestProducts}>
            <SectionLayout title="احدث المنتجات" isSwiper={true}>
                {(nextElementRef, prevElementRef) => (
                    <Swiper
                        modules={[Pagination, Navigation]}
                        className={style.swiperWrapper}
                        slidesPerView="auto"
                        navigation={{
                            prevEl: nextElementRef.current,
                            nextEl: prevElementRef.current,
                        }}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            550: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            992: { slidesPerView: 4 },
                        }}
                        loop={true}
                        spaceBetween={18}
                        onSwiper={setSwiper}
                    >
                        {latestProductsData?.map(product => (
                            <SwiperSlide key={product.id}>
                                <ProductCard product={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </SectionLayout>

        </div >
    )
}

export default LatestProducts