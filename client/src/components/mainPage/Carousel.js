import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 22px 0px;
  display: flex;
  overflow-x: hidden;

  align-items: center;
`;

const Container = styled.div`
  background-color: rgba(0, 0, 0, 1);
  border-radius: 7px;
  display: flex;
  align-items: center;
  margin: 0 12.5px;
  cursor: pointer;
  position: relative;
`;

const Row = styled.div`
  width: 100vw;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  transition: all 0.5s ease-in-out;
`;

const Img = styled.img`
  border-radius: 7px;
  margin: 0;
  margin: 0 12.5px;
  position: relative;
  cursor: pointer;
  transition: all 0.5s linear;
`;
const PrivewImg = styled.img`
  transition: all 1s linear;
  border-radius: 7px;
`;

const Button = styled.button`
  display: flex;
  cursor: pointer;
  align-items: center;
  position: absolute;
  justify-content: center;
  border: none;
  font-size: 12px;
  height: 50px;
  border-radius: 60px;
  padding: 25px 10px;
  opacity: 0.5;
  z-index: 2;
  i {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const LeftButton = styled(Button)`
  transition: all 0.5s ease-in-out;
`;

const RightButton = styled(Button)`
  transition: all 0.5s ease-in-out;
`;

const ImgWrapper = styled.div`
  position: relative;
`;
const ImgDes = styled.div`
  position: absolute;
  z-index: 5;
  width: 330px;
  height: 150px;
  border-radius: 5px;
  background-color: white;
  left: 30px;
  bottom: 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 27px 0px 20px 0px;
`;

const Title = styled.span`
  padding-left: 20px;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 14px;
`;
const Des = styled.span`
  padding-left: 20px;
  padding-bottom: 24px;
  font-size: 14px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const LinkSpan = styled.span`
  padding-left: 20px;
  padding-top: 16px;
  color: #3366ff;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  i {
    margin-left: 5px;
  }
`;

const MiniWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  transition: all 0.1s ease-in-out;
`;

const MiniTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-top: 22px;
  margin-bottom: 10px;
  text-align: center;
  color: rgba(0, 0, 0, 0.75);
`;

const MiniDes = styled.span`
  font-size: 14px;
  text-align: center;
  color: rgba(0, 0, 0, 0.6);
`;

const WantedImg = [
  "https://static.wanted.co.kr/images/banners/1489/312a0c29.jpg",
  "https://static.wanted.co.kr/images/banners/1486/fba2df30.jpg",
  "https://static.wanted.co.kr/images/banners/1468/3df61cbc.jpg",
  "https://static.wanted.co.kr/images/banners/1490/0b775035.jpg",
  "https://static.wanted.co.kr/images/banners/1484/b2853456.jpg",
  "https://static.wanted.co.kr/images/banners/1460/619f3af7.jpg",
  "https://static.wanted.co.kr/images/banners/1473/41f7b36e.jpg",
  "https://static.wanted.co.kr/images/banners/1487/0d36f0b5.jpg",
  "https://static.wanted.co.kr/images/banners/1488/baa54448.jpg",
];

const wantedTitle = [
  "22년 달라지는 노동법령",
  "성과를 내는 마케팅",
  "해, 커리어 EP 02 공개",
  "마케팅 주니어를 찾습니다",
  "성장하는 개발자가 되려면?",
  "개발자 성장 비결 공개!",
  "개발자 되고 싶은 분들!?",
  "포트폴리오를 부탁해!",
  "UX 디자이너의 커리어 설계",
];

const wantedDes = [
  "노무관리 쟁점 한 눈에 파악하기",
  "실제 사례를 공개합니다!",
  "마지막 관문 2라운드의 승자는?",
  "기업 과제 풀고 취업까지 한번에!",
  "OOO 검색하지 말 것!",
  "Velog, 글 쓰는 개발자들의 이야기",
  "프론트엔드 무료 교육과정 참여하기",
  "디자이너의 포폴 살펴보기",
  "브랜드 가치를 더하는 디자인",
];

function Slider() {
  //슬라이드
  const slideRef = useRef(null);
  const [index, setIndex] = useState(0); // 인덱스를 만들어줍니다.
  const [isSlide, setIsSlide] = useState(false); // 슬라이드 중인지 체크해줍니다. 슬라이드 중에 여러번 빠르게 클릭 못하게 하는 역할
  const [x, setX] = useState(0); // css에서 슬라이드 애니메이션 효과를 주기위해 x만큼 이동시키는 역할입니다.

  //드래그로 슬라이드 넘기기
  const [isClick, setIsClick] = useState(false); // 드래그를 시작하는지 체크해줍니다.
  const [mouseDownClientX, setMouseDownClientX] = useState(0); // 마우스를 클릭한 지점의 x 좌료를 저장합니다
  const [mouseUpClientX, setMouseUpClientX] = useState(0); // 마우스를 땐 지점의 x 좌표를 저장합니다.

  //반응형 사이트
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // 사용자의 화면크기 정보를 받아 반응형 사이트에 사용합니다.

  const increaseClick = async () => {
    if (isSlide) {
      return;
    }
    setX(-56);
    setIsSlide(true);
    await setTimeout(() => {
      setIndex((prev) => (prev === 8 ? 0 : prev + 1));
      setX(0);
      setIsSlide(false);
    }, 500);
    //setIndex((prev) => (prev === 7 ? 0 : prev + 1));
  };
  const decreaseClick = async () => {
    if (isSlide) {
      return;
    }
    setX(+56);
    setIsSlide(true);
    await setTimeout(() => {
      setIndex((prev) => (prev === 0 ? 8 : prev - 1));
      setX(0);
      setIsSlide(false);
    }, 500);
  };
  const morePrevImg = index === 1 ? 8 : index === 0 ? 7 : index - 2;
  const PrevImg = index === 0 ? 8 : index - 1;
  const NextImg = index === 8 ? 0 : index + 1;
  const moreNextImg = index === 8 ? 1 : index === 7 ? 0 : index + 2;
  //console.log(slideRef.current);
  //console.log(index);

  const onMouseDown = (event) => {
    setIsClick(true);
    setMouseDownClientX(event.pageX);
    console.log(slideRef);
  };
  const onMouseLeave = (event) => {
    setIsClick(false);
  };
  const onMouseUp = (event) => {
    setIsClick(false);
    const imgX = mouseDownClientX - mouseUpClientX;
    // console.log(imgX);
    if (imgX < -100) {
      slideRef.current.style.transform = `translateX(${imgX}px)`;
      increaseClick();
    } else if (imgX > 100) {
      slideRef.current.style.transform = `translateX(${imgX}px)`;
      decreaseClick();
    }
  };
  const onMouseMove = (event) => {
    if (!isClick) return;
    event.preventDefault();
    setMouseUpClientX(event.pageX);
    const imgX = mouseDownClientX - mouseUpClientX;
    if (Math.abs(imgX) > 100) {
      // slideRef.current.style.transform = `translateX(${imgX}px)`;
    }
  };
  const resizeWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeWidth);
    return () => {
      window.removeEventListener("resize", resizeWidth);
    };
  }, []);

  useEffect(() => {
    const autoPage = setTimeout(() => {
      setX(-56);
      setIsSlide(true);
      setTimeout(() => {
        setIndex((prev) => (prev === 8 ? 0 : prev + 1));
        setX(0);
        setIsSlide(false);
      }, 500);
    }, 5000);
    return () => {
      clearTimeout(autoPage);
    };
  }, [index, isClick]);
  console.log(`브라우저 사이즈 : ${windowWidth}`);
  return (
    <Wrapper>
      <LeftButton
        style={{
          left:
            windowWidth > 1800
              ? `18.5%`
              : windowWidth > 1500
              ? `10%`
              : windowWidth > 1300
              ? `5%`
              : `0%`,
          visibility: windowWidth < 1335 ? "hidden" : "visible",
        }}
        onClick={decreaseClick}
      >
        <i class="fas fa-chevron-left"></i>
      </LeftButton>
      <Row
        key={index}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        ref={slideRef}
        style={{
          transform: `translateX(${x}vw)`,
        }}
      >
        <Container>
          <PrivewImg
            style={{
              opacity: 0.5,
              width: windowWidth > 1200 ? null : `80vw`,
              height:
                windowWidth > 1200
                  ? null
                  : windowWidth < 770
                  ? "185px"
                  : "250px",
            }}
            src={WantedImg[morePrevImg]}
          ></PrivewImg>
        </Container>
        <Container>
          <PrivewImg
            style={{
              opacity: 0.5,
              width: windowWidth > 1200 ? null : `80vw`,
              height:
                windowWidth > 1200
                  ? null
                  : windowWidth < 770
                  ? "185px"
                  : "250px",
            }}
            src={WantedImg[PrevImg]}
          ></PrivewImg>
        </Container>
        <ImgWrapper>
          <Img
            style={{
              opacity: 1,
              width: windowWidth > 1200 ? null : `80vw`,
              height:
                windowWidth > 1200
                  ? null
                  : windowWidth < 770
                  ? "185px"
                  : "250px",
            }}
            src={WantedImg[index]}
          />
          {!isSlide && windowWidth > 1200 ? (
            <ImgDes>
              <Title>{wantedTitle[index]}</Title>
              <Des>{wantedDes[index]}</Des>
              <LinkSpan>
                바로가기<i class="fas fa-chevron-right"></i>
              </LinkSpan>
            </ImgDes>
          ) : null}
          {!isSlide && windowWidth <= 1200 ? (
            <MiniWrapper>
              <MiniTitle>{wantedTitle[index]}</MiniTitle>
              <MiniDes>{wantedDes[index]}</MiniDes>
              <LinkSpan>
                바로가기<i class="fas fa-chevron-right"></i>
              </LinkSpan>
            </MiniWrapper>
          ) : null}
        </ImgWrapper>
        <Container>
          <PrivewImg
            style={{
              opacity: 0.5,
              width: windowWidth > 1200 ? null : `80vw`,
              height:
                windowWidth > 1200
                  ? null
                  : windowWidth < 770
                  ? "185px"
                  : "250px",
            }}
            src={WantedImg[NextImg]}
          ></PrivewImg>
        </Container>
        <Container>
          <PrivewImg
            style={{
              opacity: 0.5,
              width: windowWidth > 1200 ? null : `80vw`,
              height:
                windowWidth > 1200
                  ? null
                  : windowWidth < 770
                  ? "185px"
                  : "250px",
            }}
            src={WantedImg[moreNextImg]}
          ></PrivewImg>
        </Container>
      </Row>

      <RightButton
        style={{
          right:
            windowWidth > 1800
              ? `18.5%`
              : windowWidth > 1500
              ? `10%`
              : windowWidth > 1200
              ? `5%`
              : `0%`,
          visibility: windowWidth < 1335 ? "hidden" : "visible",
        }}
        onClick={increaseClick}
      >
        <i class="fas fa-chevron-right"></i>
      </RightButton>
    </Wrapper>
  );
}

export default Slider;
