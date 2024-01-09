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
  height: 93vh;
  width: 74vw;
  margin-top: -8px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* background-color: red; */
  overflow-y: auto;

  @media (max-width: 767px) {
    margin-top: 30px;
    height: 83vh;
    width: 95vw;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  @media (max-width: 390px) {
    margin-top: 3px;
    height: 83vh;
    width: 92vw;
    margin-left: -4px;
  }
`;
