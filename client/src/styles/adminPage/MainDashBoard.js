import styled from "styled-components";
import Card from "../../shared/adminPage/components/Card";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const AdminPageMainLayout = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  gap: 1px;
`;

export const StyledCardRow1 = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  /* background-color: #fcfeff; */
  position: relative;
  margin: 0;
  /* border: 1px solid #e0e0e0; */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 13px;
  padding: 1rem;
  margin: 7px;
  width: 717px;
  height: 362px;
  overflow: hidden;
  margin-bottom: -4px;
  margin-top: 25px;
`;
export const StyledCardRow2 = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  /* background-color: #fcfeff; */
  position: relative;
  margin: 0;
  /* border: 1px solid #e0e0e0; */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 13px;
  padding: 1rem;
  margin: 7px;
  width: 717px;
  height: 532px;
  overflow: hidden;
  /* margin-bottom: -4px; */
  margin-top: -65px;
`;
