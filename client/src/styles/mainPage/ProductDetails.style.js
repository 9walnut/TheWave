import styled from "styled-components";

export const ProductLayout = styled.div`
  /* display: flex; */
  margin: 30px 40px;
  width: auto;
  height: 100%;
`;

export const ProductImgBox = styled.div`
  width: 60%;
  padding: 40px;
  /* border-color: #5a5a5a */
  border-right: 1px solid #5a5a5a;
  img {
    width: 100%;
    object-fit: cover;
  }
`;

export const ProductInfoBox = styled.div`
  width: 40%;
  padding: 40px;
  .categoryInfo {
    font-size: 16px;
    a {
      cursor: pointer;
      font-weight: 500;
    }
    span {
      color: #808080;
    }
  }
  .productName {
    margin: 10px 0;
    font-size: 24px;
  }
`;

export const ProductTopBox = styled.div`
  display: flex;
  border-bottom: 1px solid #5a5a5a;
`;

export const ProductContentBox = styled.div`
  height: 100%;
  padding: 40px;
`;

export const ProductCountBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border: 1px solid rgb(90, 90, 90);
  height: 40px;

  button {
    display: flex;
    border: none;
    outline: none;
    background-color: inherit;
    height: 100%;
    align-items: center;
    cursor: pointer;
  }

  img {
  }
`;
