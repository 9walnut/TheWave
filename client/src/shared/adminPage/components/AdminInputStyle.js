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
`;

export const AdminInputText = styled.div`
  margin-bottom: 12px;
  color: #6e7f8d;
  font-size: large;
  font-weight: 900;
  margin-left: 5px;
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
`;
