import styled from "styled-components";

export const Table = styled.table`
  border: 1px solid #ddd;
  border-spacing: 0;
  border-radius: 7px;
  width: 1600px;
  margin-left: 33px;
  cursor: pointer;
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
  ${BasicStyle}/* ${(props) => {
    if (props.text === "아이디") {
      return `
        padding-left: 38px
      `;
    } else if (props.text === "NO.") {
      return `
        padding-left: 38px
      `;
    } else {
      //기본 스타일
      return `
      text-align: center;
      
      `;
    }
  }} */
`;

export const TableTr = styled.tr`
  width: 200px;
  padding: 20px;
  text-align: center;
  &:hover {
    padding: 30px;
    background-color: #f2f5f7;
  }
`;

export const TableTd = styled.td`
  width: 100px;
  padding: 20px;
`;
export const TableInputTd = styled.td`
  width: 20px;
  padding: 10px;
  background: #e4ebf1;
`;
