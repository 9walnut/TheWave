import styled from "styled-components";

export const TableContainer = styled.div`
  overflow-x: auto; /* 가로 스크롤 */
  max-width: 100%;
`;
export const Table = styled.table`
  border: 1px solid #ddd;
  border-spacing: 0;
  border-radius: 7px;
  width: 1600px;
  margin-left: 33px;

  cursor: pointer;
  @media (max-width: 1945px) {
    width: 100%;
  }
  @media (max-width: 767px) {
    margin-top: 10px;
    width: 650px;
    height: auto;
    margin-left: 23px;
    font-size: smaller;
  }
  @media (max-width: 390px) {
    margin-top: 10px;
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

  @media (max-width: 390px) {
    font-size: smaller;
    height: 5px;
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
  /* @media (max-width: 390px) {
    height: 15px;
  } */
`;

export const TableTd = styled.td`
  width: 100px;
  padding: 20px;
  @media (max-width: 767px) {
    width: 80px;
    padding: 10px;
  }
  @media (max-width: 390px) {
    width: 650px;
    height: auto;
    font-size: smaller;
    width: 80px;
    padding: 2px;
  }
`;

export const TableInputTd = styled.td`
  width: 20px;
  padding: 10px;
  background: #e4ebf1;
  @media (max-width: 767px) {
    width: 80px;
    padding: 10px;
  }
`;
