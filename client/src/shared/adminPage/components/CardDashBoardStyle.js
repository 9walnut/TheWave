import styled from "styled-components";

export const CardBox = styled.div`
  /* background-color: white; */
  background-color: #fcfeff;
  /* background-color: rgba(255, 255, 255, 0.8); */
  position: relative;
  margin: 0;
  /* border: 1px solid #e0e0e0; */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 13px;
  padding: 1rem;
  overflow: hidden;
  /* height: 100%; */
  height: auto;
  /* height: 3000px; */
  width: 1700px;
  /* width: 80vw; */
  margin-top: -8px;
  @media (max-width: 767px) {
    margin-top: 500px;
    width: 100%;
    height: auto;
  }
`;
