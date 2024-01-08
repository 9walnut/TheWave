import styled from "styled-components";

export const MypageLayout = styled.div`
  padding: 60px 0px;
  margin: auto;
  display: flex;
  height: 100%;
  width: 80%;
  box-sizing: border-box;
  text-align: center;

  @media (max-width: 900px) {
    flex-direction: column-reverse;
    width: 100%;
  }
`;

export const MypageTitle = styled.div`
  font-size: 32px;
  font-weight: 900;
  text-align: center;
`;

export const InfoBox = styled.div`
  margin-top: 16px;
  font-size: 24px;
  text-align: center;
`;

export const SideMenu = styled.div`
  padding: 24px 10px;
  width: 20%;
  height: 50%;
  div {
    font-weight: 700;
  }
  ul {
    /* border-top: 1px solid #1a1a1a; */
  }

  li {
    margin-top: 12px;
    a {
      transition: opacity 0.3s;
      cursor: pointer;
    }
    a:hover {
      color: #7a7a7a;
    }
  }

  border-right: 1px solid #dde1e6;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const MypageContent = styled.div`
  padding: 24px;
  width: 100%;
`;
