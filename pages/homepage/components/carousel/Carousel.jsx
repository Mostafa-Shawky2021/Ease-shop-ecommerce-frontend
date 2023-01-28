import Image from 'next/image'
import FirstImage from "@assets/images/homeslider/img1.jpg"
import SecondImage from "@assets/images/homeslider/img2.jpg"
import ThirdImage from "@assets/images/homeslider/img3.jpg"
import { Autoplay, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from 'react-bootstrap';
import "swiper/css/effect-fade";
import style from './carousel.module.scss'

function Carousel() {
  return (
    <div className={style.carouselWrapper} id="carousel">
      <div className={style.intro}>
        <h1 className={style.title}>
          خصومات تصل لاكثر من <span className={style.discount}>40%</span>
        </h1>
        <p className={style.description}>
          تسوق معنا الأن حيث نقدم افضل المنتجات باسعار تنافسية مع وخصومات تصل الي 40%واكثر مما يجعلنا متميزين في مجالنا فراحة العميل هي من اهم اولاوياتنا
        </p>
        <Button className={style.buttonShopNow}>
          <span className={style.text}>تسوق الأن</span>
        </Button>
      </div>
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