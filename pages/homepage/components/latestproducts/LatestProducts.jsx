import { useState } from 'react'

import { Autoplay, Navigation } from "swiper";
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
            <SectionLayout
                title="احدث المنتجات"
                isSwiper={true}

            >
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
                        spaceBetween={18}
                        centeredSlides={true}
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