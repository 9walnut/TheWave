import styled from "styled-components";

const FooterLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #ddd;
  bottom: 0;
  width: 100%;
  height: 200px;
  @media (max-width: 550px) {
    display: block;
    border: none;
    height: auto;
    text-align: center;
  }
`;

const FooterBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  border-right: 1px solid #ddd;
  padding: 20px;
  flex-direction: column;
  color: #5a5a5a;
  .contactItem {
    img {
      margin: 8px;
      opacity: 0.7;
    }
  }
  div {
    margin-bottom: 4px;
    font-size: small;
  }
  a {
    cursor: pointer;
  }
  @media (max-width: 980px) {
    display: block;
    border-right: none;
    border-top: 1px solid #ddd;
    padding: 8px;
    .contactBox {
      display: flex;
      justify-content: center;
    }
    a {
      margin: 4px;
    }
  }
`;

function Footer() {
  return (
    <>
      <FooterLayout>
        <FooterBox>
          <div>
            <a>이용약관</a>
          </div>
          <div>
            <a>이용안내</a>
          </div>

          <div>
            <a>개인정보 처리방침</a>
          </div>
        </FooterBox>
        <FooterBox>
          <div>CUSTOMER SERVICE</div>
          <div>TUES - SAT 10:00 ~ 21:00 </div>
          <div>LUNCH 12:00 ~ 13:00</div>
          <div>SUN, MON HOLIDAY OFF</div>
        </FooterBox>
        <FooterBox>
          <div>Contact</div>
          <div className="contactBox">
            <div>
              <a
                href="https://link.inpock.co.kr/thewave"
                target="_blank"
                className="contactItem"
              >
                <img src="/footer/link.png" />
              </a>

              <a
                href="https://open.kakao.com/o/s3MTxx5d"
                target="_blank"
                className="contactItem"
              >
                <img src="/footer/kakaotalk.png" />
              </a>
            </div>
            <div>
              <a
                href="https://www.instagram.com/thewave_balloon/?igsh=bDVwb2FpdHNqbmt1"
                target="_blank"
                className="contactItem"
              >
                <img src="/footer/instagram.png" />
              </a>
              <a
                href="https://smartstore.naver.com/studiowells"
                target="_blank"
                className="contactItem"
              >
                <img src="/footer/naver.png" />
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
