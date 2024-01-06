import styled from "styled-components";

export const TextareaBox = styled.div`
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

export const AdminTextareaText = styled.div`
  margin-bottom: 12px;
  color: #6e7f8d;
  font-size: large;
  font-weight: 900;
  margin-left: 5px;
`;

export const StyledTextarea = styled.textarea`
  border: none;
  outline: none;
  width: 779px;
  height: 404px;
  margin-left: 5px;
  font-size: larger;
  background-color: #f7faf9;
  background-color: white;
  resize: none;
  border: 1px solid #e0e0e0;

  &::placeholder {
    font-size: large;
  }
`;
