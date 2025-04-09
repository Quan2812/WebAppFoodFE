import PropTypes from "prop-types";
import React from "react";
import Swiper from "react-id-swiper";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGrid from "./ProductGrid";
import "swiper/css/swiper.css";

const RelatedProductSlider = ({ spaceBottomClass, category }) => {
  const settings = {
    loop: false,
    slidesPerView: 4,
    spaceBetween: 30,
    grabCursor: true,
    breakpoints: {
      1200: {
        slidesPerView: 4,
        spaceBetween: 30
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      576: {
        slidesPerView: 1,
        spaceBetween: 10
      }
    }
  };

  return (
    <div className={`related-product-area ${spaceBottomClass || ""}`}>
      <div className="container">
        <SectionTitle
          titleText="Sản phẩm liên quan"
          positionClass="text-center"
          spaceClass="mb-50"
        />
        <div className="related-product-slider">
          <Swiper {...settings}>
            <ProductGrid
              category={category}
              limit={6}
              sliderClassName="swiper-slide"
            />
          </Swiper>
        </div>
      </div>
    </div>
  );
};

RelatedProductSlider.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string
};

export default RelatedProductSlider;