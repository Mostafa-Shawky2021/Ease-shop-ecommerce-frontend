import { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { useCategoriesData } from '../../hooks';

import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { SectionLayout } from '@root/components/layout';

import DefaultImage from "@assets/images/default/image.jpg"

import "swiper/css/pagination";
import "swiper/css/navigation";

import style from './categories.module.scss'


const Categories = () => {

    const [swiper, setSwiper] = useState();

    const { data: categories } = useCategoriesData();

    return (
        <div className={style.categories}>
            <SectionLayout title="الاقسام" isSwiper={true}>
                {(nextElementRef, prevElementRef) => (
                    <Swiper
                        style={{ direction: 'rtl' }}
                        modules={[Autoplay, Navigation]}
                        pagination={{ clickable: true }}
                        className={style.swiperWrapper}
                        autoplay={{ delay: 4000 }}
                        slidesPerView={"auto"}
                        allowTouchMove={false}
                        navigation={{
                            prevEl: prevElementRef.current,
                            nextEl: nextElementRef.current,
                        }}
                        breakpoints={{
                            0: { slidesPerView: 2 },
                            480: { slidesPerView: 3 },
                            670: { slidesPerView: 4 },
                            768: { slidesPerView: 5 },
                            992: { slidesPerView: 6 },
                            1400: { slidesPerView: 7 },
                        }}
                        loop={false}
                        spaceBetween={18}
                        onSwiper={setSwiper}
                    >
                        {categories?.map(category => (
                            <SwiperSlide key={category.id}>
                                <div className={style.catWrapper} style={{ marginTop: '1rem' }}>
                                    <div className={style.catImageWrapper}>
                                        <Link href={`category/${category.cat_slug}`}>
                                            <Image
                                                src={category.image || DefaultImage}
                                                className={style.catImage}
                                                fill
                                                alt={category.cat_name} />
                                        </Link>
                                    </div>
                                    <p className={style.catName}>{category.cat_name} </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </SectionLayout>

        </div >
    )
}
export default Categories
