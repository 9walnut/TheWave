import styled from "styled-components";

export const AdminButtonNavBackBox = styled.div`
  cursor: pointer;
  padding: 20px 2px;
  & img {
    width: 34px;
    height: 34px;
    margin-left: 35px;
  }

  @media (max-width: 767px) {
    cursor: pointer;
    padding: 10px;
    & img {
      width: 30px;
      height: 30px;
      margin-left: 10;
    }
  }
  @media (max-width: 390px) {
    cursor: pointer;
    padding: 2px;
    & img {
      width: 18px;
      height: 18px;
      margin-left: 0;
    }
  }
`;
