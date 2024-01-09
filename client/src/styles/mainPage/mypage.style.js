import styled from "styled-components";

export const MypageLayout = styled.div`
  padding: 60px 0px;
  margin: auto;
  display: flex;
  height: 100%;
  width: 80%;
  box-sizing: border-box;
  text-align: center;

  @media (max-width: 980px) {
    /* flex-direction: column-reverse; */
    padding: 30px 0px;
    width: 100%;
    display: block;
    margin-bottom: 200px;
  }
`;

export const MypageTitle = styled.div`
  font-size: 32px;
  font-weight: 900;
  text-align: center;
  @media (max-width: 980px) {
    margin-top: 30px;
    font-size: 24px;
  }
`;

export const InfoBox = styled.div`
  margin-top: 16px;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  @media (max-width: 980px) {
    font-size: 16px;
  }
`;

export const SideMenu = styled.div`
  padding: 24px 10px;
  width: 20%;
  height: 50%;
  border-right: 1px solid #dde1e6;
  div {
    font-weight: 700;
  }

  li {
    margin-top: 12px;
    a {
      transition: opacity 0.3s;
      cursor: pointer;
      display: block;
    }
    a:hover {
      color: #7a7a7a;
    }
  }

  @media (max-width: 980px) {
    padding: 16px 10px;
    width: 100%;
    border-right: none;
    div {
      font-weight: 700;
    }
    ul {
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding: 0;
      list-style: none;
      margin: auto;
    }

    li {
      margin-top: 12px;
      margin-right: 20px;
      a {
        font-size: x-small;
        transition: opacity 0.3s;
        cursor: pointer;
        display: block;
      }
      a:hover {
        color: #7a7a7a;
      }
    }
  }
`;

export const MypageContent = styled.div`
  padding: 24px;
  width: 100%;
`;
