import styled from "styled-components";

export const OrderListLayout = styled.div`
  display: flex;
  height: 1600px;
  width: 100%;
  margin-top: 100px;
  margin-bottom: 100px;
  padding: 20px;
`;

export const OrderLeftBox = styled.div`
  height: 100%;
  width: 60%;
  padding: 2em;
  border-right: 1px solid black;
`;

export const OrderRightBox = styled.div`
  height: 100%;
  width: 40%;
  padding: 2em;
`;
export const OrderListTitle = styled.h1`
  font-size: 30px;
`;

export const OrderBox = styled.div`
  border-bottom: 1px solid black;
  padding-bottom: 10px;
`;

export const Productbox = styled.div`
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid black;
  input {
    margin-right: 20px;
  }
`;

export const ImgBox = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;

  img {
    width: 100%;
    height: 100%;
  }
`;
