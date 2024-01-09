import styled from "styled-components";

export const InputBox = styled.div`
  width: 810px;
  /* height: 72px; */
  flex-shrink: 0;
  border-radius: 13px;
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
    /* text-align: center; */
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
    margin-left: 5;
  }
`;

// input 기본 스타일 속성
export const StyledInput = styled.input`
  border: none;
  outline: none;
  width: 800px;
  height: 40px;
  background-color: transparent;
  margin-left: 5px;
  font-size: large;

  &::placeholder {
    font-size: larger;
  }
  @media (max-width: 396px) {
    font-size: smaller;
    height: 11px;
  }
`;
