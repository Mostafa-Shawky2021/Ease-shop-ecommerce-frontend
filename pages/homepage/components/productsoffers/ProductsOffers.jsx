import { useState } from "react";

import { useProductsData } from "@root/hooks";

import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { SectionLayout } from "@root/components/layout";
import { ProductCard } from "@root/components/cards";

import "swiper/css/pagination";
import "swiper/css/navigation";

import style from "./productsoffers.module.scss";

const ProductsOffers = () => {
  const [_, setSwiper] = useState(null);

  const { data: productsOffers } = useProductsData(1, {
    offers: true,
    latest: true,
    limit: 8,
  });

  return (
    !!productsOffers?.products && (
      <div className={style.offersWrapper}>
        <SectionLayout
          title="عروض وخصومات"
          isSwiper={true}
          link="/productsoffers"
        >
          {(nextElementRef, prevElementRef) => (
            <Swiper
              modules={[Navigation, Autoplay]}
              className={style.swiperWrapper}
              autoplay={{ delay: 4000 }}
              navigation={{
                prevEl: nextElementRef.current,
                nextEl: prevElementRef.current,
              }}
              allowTouchMove={true}
              slidesPerView={"auto"}
              loop={false}
              spaceBetween={22}
              onSwiper={setSwiper}
              grabCursor={true}
            >
              {productsOffers?.products?.map((product) => (
                <SwiperSlide
                  key={product.id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                >
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </SectionLayout>
      </div>
    )
  );
};

export default ProductsOffers;
