import styled from "styled-components";

export const ThumbnailBox = styled.div`
  /* background-color: #e9eff4; */
  /* border: 0px solid #e0e0e0; */
  box-shadow: 2px 11px 14px -4px #fafbff;
  border-radius: 8px;
  height: 300px;
  width: 300px;
  margin-top: 10px;
  padding-top: 21px;
  color: #6e7f8d;
  text-align: center;
  font-weight: 900;
  border: 1px solid #e0e0e0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  overflow: hidden;
`;

export const FileSelectBtn = styled.button`
  width: 80px;
  height: 30px;
  background-color: #cddae3;
  padding: 10px;
  border: none;
  font-size: smaller;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: blue;
  }
`;
