import styled from "styled-components";
import Card from "../../shared/adminPage/components/Card";

export const AdminPageMainLayout = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  gap: 10px;
`;

export const StyledCard = styled.div`
  position: relative;
  margin: 0;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 1rem;
  margin: 5px;
  width: 600px;
  height: 320px;
  overflow: hidden;
`;
