import styled from "styled-components";

export const MypageLayout = styled.div`
  padding: 80px 0px;
  margin: auto;
  display: flex;
  height: 100%;
  width: 80%;
  box-sizing: border-box;
  text-align: center;
`;
export const MypageTitle = styled.div`
  font-size: 32px;
  font-weight: 900;
  text-align: center;
`;

export const InfoBox = styled.div`
  margin-top: 10px;
  font-size: 20px;
  text-align: center;
`;
export const SideMenu = styled.div`
  width: 20%;
  div {
    font-weight: 700;
  }
  ul {
    /* border-top: 1px solid #1a1a1a; */
  }

  li {
    margin-top: 8px;
    a {
      cursor: pointer;
    }
  }
`;

export const MypageContent = styled.div`
  width: 80%;
`;
