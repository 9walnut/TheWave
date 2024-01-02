// import "./Footer.css"
import styled from "styled-components";

const FooterLayout = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  justify-content: center;
  border: 1px solid black;
  /* bottom: 0; */
  width: 100%;
  height: 200px;
`;

const FooterBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  border-right: 1px solid black;
  padding: 20px;
  flex-direction: column;
  color: #5a5a5a;
  div {
    margin-bottom: 4px;
    font-size: small;
  }
  a {
    cursor: pointer;
  }
`;

function Footer() {
  return (
    <>
      <FooterLayout>
        <FooterBox>
          <a>
            <div>이용약관</div>
          </a>
          <a>
            <div>이용안내</div>
          </a>
          <a>
            <div>개인정보 처리방침</div>
          </a>
        </FooterBox>
        <FooterBox>
          <div>CUSTOMER SERVICE</div>
          <div>TUES - SAT 10:00 ~ 21:00 </div>
          <div>LUNCH 12:00 ~ 13:00</div>
          <div>SUN, MON HOLIDAY OFF</div>
        </FooterBox>
        <FooterBox>
          <div>Contact</div>
          <div>
            <div>
              <a href="https://link.inpock.co.kr/thewave" target="_blank">
                <img src="/footer/link.png"></img>
              </a>
              <a href="https://open.kakao.com/o/s3MTxx5d" target="_blank">
                <img src="/footer/kakaotalk.png"></img>
              </a>
            </div>
            <div>
              <a
                href="https://www.instagram.com/thewave_balloon/?igsh=bDVwb2FpdHNqbmt1"
                target="_blank"
              >
                <img src="/footer/instagram.png"></img>
              </a>
              <a
                href="https://smartstore.naver.com/studiowells"
                target="_blank"
              >
                <img src="/footer/naver.png"></img>
              </a>
            </div>
          </div>
        </FooterBox>
        <FooterBox>
          <div>법인명: 더웨이브</div>
          <div>사업자등록번호: 2910102479</div>
          <div>주소: 서울특별시 양천구 목동중앙남로 83</div>
        </FooterBox>
      </FooterLayout>
    </>
  );
}

export default Footer;
