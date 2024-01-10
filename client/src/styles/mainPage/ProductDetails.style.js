import styled from "styled-components";

export const ProductLayout = styled.div`
  /* display: flex; */
  margin: 30px 40px;
  width: auto;
  margin-left: auto;
  margin-right: auto;
  max-width: 1600px;
  height: 100%;
`;

export const ProductImgBox = styled.div`
  width: 60%;
  padding: 40px;
  /* border-color: #5a5a5a */
  border-right: 1px solid #dddddd;
  img {
    width: 100%;
    object-fit: cover;
  }
  @media (max-width: 980px) {
    width: 100%;
    display: block;
    border-right: none;
    border-bottom: 1px solid #ddd;
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

  @media (max-width: 980px) {
    width: 100%;
    display: block;
    text-align: center;
    .categoryInfo {
      font-size: 12px;
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
      font-size: 18px;
    }
  }
`;

export const ProductTopBox = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  @media (max-width: 980px) {
    width: 100%;
    display: block;
  }
`;

export const ProductContentBox = styled.div`
  height: 100%;
  padding: 40px;
`;

export const InfoProductBox = styled.div`
  display: flex;
  flex-direction: column;
  color: #5a5a5a;
  .productPrice {
    font-weight: 500;
  }
  div {
    margin: 4px 0px;
  }
  @media (max-width: 980px) {
    font-size: small;
  }
`;

export const CenterBox = styled.div`
  display: flex;
  justify-content: center;
`;
export const ProductCountBox = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  color: #5a5a5a;
  border: 1px solid #ddd;
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

export const PaymentBox = styled.div`
  margin: 8px;
  text-align: center;
  font-size: small;
  color: #5a5a5a;
`;

export const SelectBox = styled.div`
  display: flex;
  justify-content: space-around;
`;
export const Select = styled.select`
  margin: 10px auto;
  color: #5a5a5a;
  width: 40%;
  height: 40px;
  border: none;
  border-bottom: 1px solid #e5e5e5;
`;

export const Option = styled.option`
  color: black;
`;

export const InfoButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
`;
export const InfoButton = styled.button`
  width: 90%;
  height: 40px;
  margin: 10px;
  border: none;
  font-weight: 900;
  cursor: pointer;
`;
