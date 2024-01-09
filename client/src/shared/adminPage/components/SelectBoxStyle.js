import styled from "styled-components";

export const Select = styled.select`
  width: 200px;
  height: 42px;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 9px 13px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  @media (max-width: 767px) {
    width: 110px;
  }
  @media (max-width: 396px) {
    font-size: 8px;
    height: 18px;
    width: 80px;
    border-radius: 0;
    padding: 1px 11px;
    font-weight: 200;
  }
`;
