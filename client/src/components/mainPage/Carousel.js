import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";

const CarouselContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
`;

const ImgBox = styled.div`
  padding: 0 10px;
  @media (max-width: 767px) {
    padding: 0 6px;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;

const SlickSlider = styled(Slider)`
  max-width: 100%;
  margin: 0 auto;
`;

function MainCarousel() {
  const imgList = [
    "https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1704722278642_moneyBallon02.jpg",
    "https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1704722039518_tulipDetail02.jpg",
    "https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1704721891528_daisy02.jpg",
    "https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1704721508672_characterBalloon06.jpg",
    "https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1704722733124_letteringBalloon17.jpg",
    "https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1704723100102_roseBallon03.jpg",
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
    dots: true,
    // responsive: [
    //   {
    //     breakpoint: 767,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 1,
    //     },
    //   },
    //   {
    //     breakpoint: 1200,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  };

  return (
    <CarouselContainer>
      <SlickSlider {...settings}>
        {imgList.map((img) => {
          return (
            <ImgBox key={img}>
              <p>
                <img src={img} alt={`Carousel Image ${img}`} />
              </p>
            </ImgBox>
          );
        })}
      </SlickSlider>
    </CarouselContainer>
  );
}

export default MainCarousel;
