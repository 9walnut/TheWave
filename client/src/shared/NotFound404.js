import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/AddressSearchStyle";

function NotFound() {
  const imgList = [
    "https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1704722278642_moneyBallon02.jpg",
    "https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1704722039518_tulipDetail02.jpg",
    "https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1704721891528_daisy02.jpg",
    "https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1704721508672_characterBalloon06.jpg",
    "https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1704722733124_letteringBalloon17.jpg",
    "https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1704723100102_roseBallon03.jpg",
  ];
  return (
    <>
      <ImgLayout>
        <h3>404 Page</h3>
        <Link to={"/"}>
          <Button>메인으로 돌아가기</Button>
        </Link>
        <p>이 상품은 어떠세요!?</p>
        {imgList.map((src, i) => {
          return (
            <div>
              <Link to={`/products/${i + 21}`}>
                <ImgBox src={src} />
              </Link>
            </div>
          );
        })}
      </ImgLayout>
    </>
  );
}

const ImgLayout = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  align-content: center;
  padding: 2rem;
  width: 100%;
  h3 {
    font-size: 60px;
    color: #5a5a5a;
    margin: 20px 0;
  }
  p {
    font-weight: 600;
    font-size: xx-large;
  }
`;
const ImgBox = styled.img`
  width: 50%;
  margin: 15px;
`;

export default NotFound;
