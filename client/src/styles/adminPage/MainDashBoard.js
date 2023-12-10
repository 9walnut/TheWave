import styled from "styled-components";
import Card from "../../shared/adminPage/components/Card";

export const AdminPageMainLayout = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 400px);
  grid-template-columns: repeat(2, 400px);
  overflow: hidden;
  gap: 10px;
`;

export const StyledCard = styled(Card)`
  margin: 10px;
  width: 200px;
  height: 700px !important;
  overflow: hidden;
`;
