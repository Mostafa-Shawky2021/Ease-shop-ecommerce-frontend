import React, { useState, useRef } from 'react'
import Image from 'next/image';

import { Container } from 'react-bootstrap'
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";

import { SectionLayout } from '@root/components/layout';

import FirstImage from "@assets/images/categories/laptop.png"
import SecondImage from "@assets/images/categories/watch2.jpg"
import ThirdImage from "@assets/images/categories/mobile.jpg"
import FourthImage from "@assets/images/categories/watch.jpg"

import "swiper/css/pagination";
import "swiper/css/navigation";
import style from './categories.module.scss'

const Categories = () => {

    const [swiper, setSwiper] = useState();

    return (
        <div className={style.categories}>
            <SectionLayout title="التسوق عن طريق الاقسام" isSwiper={true}>
                {(nextElementRef, prevElementRef) => (
                    <Swiper
                        modules={[Pagination, Navigation]}
                        className={style.swiperWrapper}
                        slidesPerView="auto"
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
                        }}
                        loop={true}
                        spaceBetween={18}
                        onSwiper={setSwiper}
                    >
                        <SwiperSlide>
                            <div className={style.catWrapper}>
                                <div className={style.catImageWrapper}>
                                    <Image src={FirstImage} className={style.catImage} alt="category-image" />
                                </div>
                                <p className={style.catName}>موبايل </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={style.catWrapper}>
                                <div className={style.catImageWrapper}>
                                    <Image src={FirstImage} className={style.catImage} alt="category-image" />
                                </div>
                                <p className={style.catName}>موبايل </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={style.catWrapper}>
                                <div className={style.catImageWrapper}>
                                    <Image src={FirstImage} className={style.catImage} alt="category-image" />
                                </div>
                                <p className={style.catName}>موبايل </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={style.catWrapper}>
                                <div className={style.catImageWrapper}>
                                    <Image src={FourthImage} className={style.catImage} alt="category-image" />
                                </div>
                                <p className={style.catName}>موبايل </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={style.catWrapper}>
                                <div className={style.catImageWrapper}>
                                    <Image src={FourthImage} className={style.catImage} alt="category-image" />
                                </div>
                                <p className={style.catName}>موبايل </p>
                            </div>

                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={style.catWrapper}>
                                <div className={style.catImageWrapper}>
                                    <Image src={FourthImage} className={style.catImage} alt="category-image" />
                                </div>
                                <p className={style.catName}>موبايل </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={style.catWrapper}>
                                <div className={style.catImageWrapper}>
                                    <Image src={FourthImage} className={style.catImage} alt="category-image" />
                                </div>
                                <p className={style.catName}>موبايل </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={style.catWrapper}>
                                <div className={style.catImageWrapper}>
                                    <Image src={FourthImage} className={style.catImage} alt="category-image" />
                                </div>
                                <p className={style.catName}>موبايل </p>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                )}
            </SectionLayout>

        </div >
    )
}
export default Categories
