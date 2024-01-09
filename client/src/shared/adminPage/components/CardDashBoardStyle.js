import styled from "styled-components";

export const CardBox = styled.div`
  background-color: #fcfeff;
  position: relative;
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 13px;
  padding: 1rem;
  overflow: hidden;
  height: 93vh;
  width: 80vw;
  overflow-y: auto;
  /* width: 1700px; */
  margin: auto;
  margin-top: 10px;
  @media (max-width: 767px) {
    margin-top: 500px;
    width: 100%;
    height: auto;
  }
`;
