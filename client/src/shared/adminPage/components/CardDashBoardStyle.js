import styled from "styled-components";

export const CardBox = styled.div`
  background-color: #fcfeff;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 13px;
  padding: 2rem;
  overflow: hidden;
  height: 93vh;
  width: 80vw;
  overflow-y: auto;
  margin: auto;
  margin-top: 10px;
  padding-top: 100px;

  @media (max-width: 767px) {
    /* margin-bottom: 10px; */
  }
  @media (max-width: 396px) {
    height: 88vh;
    width: 89vw;
    margin-top: 5px;
  }
`;
