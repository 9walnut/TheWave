import styled from "styled-components";

export const ProductContentBox = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const CardItemBox = styled.div`
  width: calc(25% - 24px);
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 10px;
  cursor: pointer;

  div {
    margin-bottom: 10px;
  }

  img {
    border-radius: 10px;
    width: 100%;
    height: 50%;
  }

  &:hover {
    opacity: 0.7;
  }
`;
