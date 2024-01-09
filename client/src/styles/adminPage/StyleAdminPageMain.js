import styled from "styled-components";

export const AdminPageMainLayout = styled.div`
  /* background-color: #eff2f9; */
  background: linear-gradient(
    119.73617769993893deg,
    rgba(239, 242, 249, 1) 34.73985239852399%,
    rgba(238, 241, 248, 1) 34.73985239852399%,
    rgba(228, 235, 240, 1) 87.06457564575646%
  );
  display: grid;
  grid-template-columns: 255px 0.8fr;
  grid-gap: 10px;
  /* min-height: 100vh; */
  /* height: 100%; */
  height: 100vh;
  overflow-y: auto;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 60px;
    /* min-height: 175vh; */
    height: 140vh;
  }
`;

export const LeftBox = styled.header`
  background-color: none;
  @media (max-width: 767px) {
    margin: 10px;
    position: static;
    width: auto;
    padding-top: 0;
    height: auto;
    width: 100%;
    /* background-color: red; */
  }
`;

export const RightBox = styled.main`
  background-color: none;
  margin: 20px;
  margin-top: 45px;

  @media (max-width: 767px) {
    grid-row: 1;
    grid-column: span 2;
    margin: 20px;
    margin-top: 15px;
    height: 97%;
    /* background-color: blue; */
  }
`;
