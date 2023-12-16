import "./Footer.css";
import styled from "styled-components";

const FooterLayout = styled.div`
  display: flex;
  align-items: center;
  /* position: absolute; */
  justify-content: center;
  border: 1px solid black;
  bottom: 0;
  width: 100%;
  height: 200px;
`;

const FooterBox = styled.div`
  display: flex;
  width: 100%;
  height: 160px;
  border-right: 1px solid black;
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

function Footer() {
  return (
    <>
      <FooterLayout>
        <FooterBox>footer1</FooterBox>
        <FooterBox>footer2</FooterBox>
        <FooterBox>footer3</FooterBox>
        <FooterBox>footer4</FooterBox>
      </FooterLayout>
    </>
  );
}

export default Footer;
