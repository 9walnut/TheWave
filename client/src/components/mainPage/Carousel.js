import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";

const CarouselContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto; /* 가운데 정렬을 위해 auto로 마진을 조절합니다. */
`;

const ImgBox = styled.div`
  /* margin: 0px 40px; */

  img {
    display: inline-block;
    /* margin: 0px 50px; */
    /* width: 100%; */
    height: 700px;
    @media (max-width: 767px) {
      height: 300px;
    }
  }
`;

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
    infinite: true,
    speed: 700,
    centerMode: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: true,
    autoplay: true, // 자동 캐러셀
    autoplaySpeed: 3000, // 자동 캐러셀 속도
    responsive: [
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    // responsive: [
    //   {
    //     breakpoint: 2300,
    //     settings: {
    //       centerMode: true,
    //       slidesToShow: 2,
    //     },
    //     breakpoint: 1800,
    //     settings: {
    //       centerMode: true,
    //       slidesToShow: 2,
    //     },
    //     breakpoint: 1400,
    //     settings: {
    //       centerMode: true,
    //       slidesToShow: 1,
    //     },
    //     breakpoint: 1100,
    //     settings: {
    //       centerMode: true,
    //       slidesToShow: 1,
    //     },
    //   },
    // ],
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>
        {imgList.map((img) => {
          return (
            <ImgBox key={img}>
              <p>
                <img src={img} alt={`Carousel Image ${img}`} />
              </p>
            </ImgBox>
          );
        })}
      </Slider>
    </CarouselContainer>
  );
}

export default MainCarousel;
