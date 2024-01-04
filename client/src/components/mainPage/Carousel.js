import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";

function MainCarousel() {
  const settings = {
    className: "slider-items",
    infinite: true,
    speed: 700,
    slideToShow: 2,
    slidesToScroll: 1, // 스크롤 시 넘어가는 컨텐츠 수
    dots: true,
    arrows: false,
    autoplay: true, // 자동 캐러셀
    autoplaySpeed: 2000, // 자동 캐러셀 속도
  };

  return (
    <div className="slider-wrapper">
      <Slider {...settings}>
        <div className="slider-item">
          <div className="slider-item-gradient">
            <img src="/img/carousel1.jpg" />
          </div>
          <div className="slider-item-gradient">
            <img src="/img/carousel1.jpg" />
          </div>
        </div>
        <div className="slider-item">
          <div className="slider-item-gradient"></div>
          <img src="/csp2.jpg" />
        </div>
        <div className="slider-item">
          <div className="slider-item-gradient"></div>
          <img src="/csp3.jpg" />
        </div>
        <div className="slider-item">
          <div className="slider-item-gradient"></div>
          <img src="/csp4.jpg" />
        </div>
      </Slider>
    </div>
  );
}

export default MainCarousel;
