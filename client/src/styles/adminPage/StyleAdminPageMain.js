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
  height: 100%;
`;

export const LeftBox = styled.header`
  background-color: none;
`;

export const RightBox = styled.main`
  background-color: none;
  margin: 20px;
  margin-top: 45px;
`;
