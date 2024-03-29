import styled from "styled-components";
import Card from "../../shared/adminPage/components/Card";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

export const AdminPageMainLayout = styled.div`
  /* display: grid; */
  display: inline-grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  gap: 10px;
  margin: auto;
  @media (max-width: 768px) {
    /* grid-template-rows: repeat(2, 1fr); */
    grid-template-rows: auto auto;
    grid-template-columns: 1fr;
    gap: 10px;
  }
  @media (max-width: 396px) {
  }
`;

export const StyledCardRow1 = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  position: relative;
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 13px;
  padding: 1rem;
  margin: 7px;
  width: 35vw;
  height: 362px;
  overflow: hidden;
  margin-bottom: -4px;
  margin-top: 15px;

  @media (max-width: 768px) {
    width: 99%;
    margin-bottom: 15px;
    padding: 2px;
    margin: 2px;
  }
  @media (max-width: 396px) {
    width: 100%;
    margin-bottom: 15px;
    padding: 2px;
    margin: 2px;
    border-radius: 5px;
    margin-left: 0px;
    height: 300px;
  }
`;
export const StyledCardRow2 = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  position: relative;
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 13px;
  padding: 1rem;
  margin: 7px;
  width: 35vw;
  height: 532px;
  overflow: hidden;
  overflow-x: auto;
  margin-top: -75px;
  @media (max-width: 768px) {
    width: 99%;
    margin-bottom: 25px;
    padding: 2px;
    margin: 2px;
  }
  @media (max-width: 396px) {
    width: 100%;
    margin-bottom: 15px;
    padding: 2px;
    margin: 2px;
    border-radius: 5px;
    margin-left: 0px;
    overflow-x: auto;
  }
`;
