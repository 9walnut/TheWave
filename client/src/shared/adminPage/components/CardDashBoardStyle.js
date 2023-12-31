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
  /* width: 1700px; */
  margin: auto;
  margin-top: 10px;
  padding-top: 100px;

  @media (max-width: 767px) {
    /* margin-top: 500px; */
    /* width: 100%;
    height: 93vh;
    width: 89vw;
    margin-top: 5px;

    /* margin-bottom: 10px; */
  }
  @media (max-width: 390px) {
    height: 88vh;
    width: 89vw;
    margin-top: 5px;
  }
`;
