import Image from 'next/image'
import FirstImage from "@assets/images/homeslider/img1.jpg"
import SecondImage from "@assets/images/homeslider/img2.jpg"
import ThirdImage from "@assets/images/homeslider/img3.jpg"
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import style from './carousel.module.scss'
import "swiper/css/effect-fade";

function Carousel() {
  return (
    <div className={style.carouselWrapper}>
      <Swiper
        style={{ direction: 'ltr' }}
        autoplay={{
          delay: 4000,

        }}
        slidesPerView={1}
        loop={true}
        modules={[Autoplay, EffectFade]}
        effect={"fade"}
      >
        <SwiperSlide className={style.sliderImage}>
          <Image className={style.image} src={FirstImage} alt="slider" />
        </SwiperSlide>
        <SwiperSlide className={style.sliderImage}>
          <Image className={style.image} src={SecondImage} alt="slider" />
        </SwiperSlide>
        <SwiperSlide className={style.sliderImage}>
          <Image className={style.image} src={ThirdImage} alt="slider" />
        </SwiperSlide>
      </Swiper>
    </div >

  )
}
export default Carousel