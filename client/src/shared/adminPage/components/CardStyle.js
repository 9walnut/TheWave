import styled from "styled-components";

export const CardBox = styled.div`
  background-color: #fcfeff;
  position: relative;
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 13px;
  padding: 1rem;
  height: 93vh;
  width: 82vw;
  margin-top: -8px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  right: 1%;

  @media (max-width: 767px) {
    margin-top: 30px;
    height: 83vh;
    width: 95vw;
    display: flex;
    /* flex-direction: column; */
    /* justify-content: space-between; */
    > div:not(:last-child) {
      margin-bottom: 35px;
    }
  }
  @media (max-width: 396px) {
    margin-top: 3px;
    /* margin-top: -65px; */
    height: 88vh;
    width: 95vw;
    margin-left: -5px;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    /* justify-content: space-between; */
    /* justify-content: center; */

    > div:not(:last-child) {
      margin-bottom: 15px;
    }
  }
`;
