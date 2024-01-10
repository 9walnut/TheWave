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
  @media (max-width: 767px) {
    height: auto;
    width: 85vw;
    padding: 6px;
    margin-bottom: 5px;
    font-size: smaller;
    /* text-align: center; */
  }
  @media (max-width: 396px) {
    height: auto;
    width: 85vw;
    padding: 6px;
    margin-bottom: 4px;
    font-size: smaller;
    /* text-align: center; */
  }
`;

export const AdminTextareaText = styled.div`
  margin-bottom: 12px;
  color: #6e7f8d;
  font-size: large;
  font-weight: 900;
  margin-left: 5px;

  @media (max-width: 396px) {
    font-size: smaller;
  }
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
  @media (max-width: 767px) {
    height: auto;
    width: 80vw;
    padding: 6px;
    margin-bottom: 4px;
    font-size: smaller;
    /* text-align: center; */
  }
  @media (max-width: 396px) {
    font-size: smaller;
    width: 78vw;
    margin-left: 0px;
    height: auto;

    &::placeholder {
      font-size: smaller;
    }
  }
`;
