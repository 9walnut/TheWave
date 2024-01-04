import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "./Carousel.css"

function MainCarousel() {
  const imgList = [
    "/img/daisy01.jpg",
    "/img/daisy02.jpg",
    "/img/daisy03.jpg",
    "/img/daisy04.jpg",
    "/img/daisy05.jpg",
    "/img/daisy06.jpg",
    "/img/daisy07.jpg",
  ];

  const settings = {
    className: "slider variable-width",
    // dots: false,
    infinite: true,
    speed: 700,
    centerMode: true,
    centerPadding: "40px",
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true, // 자동 캐러셀
    autoplaySpeed: 2000, // 자동 캐러셀 속도
    // pauseOnHover: false, // 호버 시 멈춤
    responsive: [
      {
        breakpoint: 2300,
        settings: {
          slidesToShow: 2,
        },
        breakpoint: 1800,
        settings: {
          slidesToShow: 2,
        },
        breakpoint: 1400,
        settings: {
          slidesToShow: 1,
        },
        breakpoint: 1100,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        {imgList.map((img) => {
          return (
            <div>
              <p>
                <img src={img} style={{ height: "700px" }} />
              </p>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default MainCarousel;
