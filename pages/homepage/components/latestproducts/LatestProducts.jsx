import { useState } from 'react'

import { useLatestProductsData } from '../../hooks';

import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { SectionLayout } from '@root/components/layout';
import { ProductCard } from '@root/components/cards';

import "swiper/css/pagination";
import "swiper/css/navigation";

import style from './latestproducts.module.scss';

const LatestProducts = () => {

    const [_, setSwiper] = useState(null)

    const { data: latestProducts, isFetching, isLoading } = useLatestProductsData();
    console.log({ isLoading, isFetching })
    return (
        <div className={style.latestProducts}>
            <SectionLayout title="احدث المنتجات">
                {(nextElementRef, prevElementRef) => (
                    <Swiper
                        style={{ direction: 'rtl' }}
                        modules={[Navigation, Autoplay]}
                        className={style.swiperWrapper}
                        slidesPerView={"auto"}
                        autoplay={{ delay: 4000 }}
                        navigation={{
                            prevEl: nextElementRef.current,
                            nextEl: prevElementRef.current,
                        }}
                        breakpoints={{
                            0: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            992: { slidesPerView: 4 },
                            1400: { slidesPerView: 5 }
                        }}
                        loop={true}
                        spaceBetween={10}
                        onSwiper={setSwiper}>
                        {latestProducts?.map(product =>
                            <SwiperSlide key={product.id}>
                                <ProductCard product={product} />
                            </SwiperSlide>
                        )}
                    </Swiper>
                )}
            </SectionLayout>

        </div >
    )
}

export default LatestProducts