import { useState } from 'react'

import { useProductsData } from '@root/hooks';

import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { SectionLayout } from '@root/components/layout';
import { ProductCard } from '@root/components/cards';

import "swiper/css/pagination";
import "swiper/css/navigation";
import style from './productsoffers.module.scss';

const ProductsOffers = () => {

    const [_, setSwiper] = useState(null)

    const { data: productsOffers } = useProductsData(1, { offers: true, limit: 8 });

    return (
        !!productsOffers && (
            <div className={style.offersWrapper}>
                <SectionLayout
                    title="عروض وخصومات"
                    isSwiper={true}
                    link="/productsoffers"
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
                            spaceBetween={22}
                            onSwiper={setSwiper}>
                            {productsOffers?.products?.map(product =>
                                <SwiperSlide key={product.id}>
                                    <ProductCard product={product} />
                                </SwiperSlide>
                            )}
                        </Swiper>
                    )}
                </SectionLayout>
            </div>)

    )
}

export default ProductsOffers