import styled from "styled-components";

export const InputBox = styled.div`
  width: 300px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 13px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  margin-left: 5px;
  @media (max-width: 767px) {
    font-size: smaller;
  }
  @media (max-width: 396px) {
    width: 200px;
    height: 27px;
    font-size: smaller;
    border-radius: 8px;
  }
`;
export const StyledInput = styled.input`
  border: none;
  outline: none;
  width: 800px;
  height: 40px;
  background-color: transparent;
  margin-left: 5px;

  &::placeholder {
    font-size: larger;
  }
  @media (max-width: 396px) {
    font-size: smaller;
    height: 11px;
    margin-top: 6px;
    &::placeholder {
      font-size: smaller;
    }
  }
`;
