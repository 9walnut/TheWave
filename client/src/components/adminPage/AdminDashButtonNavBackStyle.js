import styled from "styled-components";

export const AdminDashButtonNavBackBox = styled.div`
  cursor: pointer;
  padding: 20px 2px;
  & img {
    width: 34px;
    height: 34px;
    margin-left: 3px;
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
  @media (max-width: 396px) {
    cursor: pointer;
    padding: 2px;
    margin-top: -70px;
    margin-bottom: 5px;
    & img {
      width: 18px;
      height: 18px;
      margin-left: 0;
    }
  }
`;
