import styled from "styled-components";

export const SelectBox = styled.div`
  width: 810px;
  /* height: 72px; */
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  padding: 12px;
  margin-bottom: 10px;
  margin-left: 5px;
  @media (max-width: 396px) {
    height: auto;
    width: 85vw;
    padding: 1;
    margin-bottom: 4px;
    font-size: smaller;
  }
`;

export const AdminInputText = styled.div`
  margin-bottom: 12px;
  color: #6e7f8d;
  font-size: large;
  font-weight: 900;
  margin-left: 5px;
  @media (max-width: 396px) {
    font-size: smaller;
  }
`;
