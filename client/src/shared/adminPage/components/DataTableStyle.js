import styled from "styled-components";

export const TableContainer = styled.div`
  overflow-x: auto;
  max-width: 100%;
  @media (max-width: 767px) {
    overflow-x: auto;
  }
`;
export const Table = styled.table`
  border: 1px solid #ddd;
  border-spacing: 0;
  border-radius: 7px;
  width: 78vw;
  margin-left: 33px;

  cursor: pointer;
  @media (max-width: 1945px) {
    width: 100%;
  }
  @media (max-width: 767px) {
    overflow-x: auto;
    margin-top: 10px;
    width: 650px;
    height: auto;
    margin-left: 23px;
    font-size: smaller;
  }
  @media (max-width: 396px) {
    margin-top: 2px;
    width: 650px;
    height: auto;
    margin-left: 2px;
    font-size: smaller;
  }
`;

const BasicStyle = `
  padding: 20px;
  background: #e4ebf1;
  color: #6e7f8d;
  font-weight: 900;
  text-align: center;
`;

export const TableHeader = styled.th`
  width: ${(props) => props.width}px;
  ${BasicStyle} /* @media (max-width: 767px) {
    ${(props) => props.text === "주소" && "display: none;"}
  } */

  @media (max-width: 396px) {
    font-size: smaller;
    padding: 5px;
  }
`;

export const TableTr = styled.tr`
  width: 200px;
  padding: 20px;
  text-align: center;
  &:hover {
    padding: 30px;
    background-color: #f2f5f7;
  }
  @media (max-width: 396px) {
    height: 5px;
    font-size: smaller;
  }
`;

export const TableTd = styled.td`
  width: 80px;
  padding: 20px;
  white-space: nowrap;
  @media (max-width: 767px) {
    width: 80px;
    padding: 10px;
  }
  @media (max-width: 396px) {
    width: 650px;
    height: auto;
    font-size: smaller;
    width: 70px;
    padding: 2px;
  }
`;

export const TableInputTd = styled.td`
  width: 20px;
  padding: 10px;
  background: #e4ebf1;
  @media (max-width: 767px) {
    width: 70px;
    padding: 10px;
  }
  @media (max-width: 767px) {
    padding: 5px;
  }
`;
