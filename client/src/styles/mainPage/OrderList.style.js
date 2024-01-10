import styled from "styled-components";

export const OrderListLayout = styled.div`
  display: flex;
  height: 1400px;
  width: 100%;
  margin-bottom: 100px;
  @media (max-width: 980px) {
    flex-direction: column;
    height: auto;
  }
`;

export const OrderLeftBox = styled.div`
  height: 100%;
  width: 60%;
  padding: 2em;
  border-right: 1px solid #ddd;
  @media (max-width: 980px) {
    width: 100%;
    max-width: 1400px;
  }
`;

export const OrderRightBox = styled.div`
  max-width: 400px;
  height: 100%;
  width: 40%;
  padding: 2em;
  @media (max-width: 980px) {
    width: 100%;
    max-width: 1400px;
    border-right: 1px solid #ddd;
  }
`;
export const OrderListTitle = styled.h1`
  font-size: 24px;
  width: 100%;
`;

export const OrderBox = styled.div`
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  font-weight: 700;
  text-align: left;
  width: 100%;
`;

export const Productbox = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  justify-content: space-between;
  /* input {
    margin-right: 20px;
  } */
`;

export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  div {
    font-size: medium;
  }
`;

export const ProductCountBox = styled.div`
  margin-top: 10px;
  display: flex;
  width: 14vw;
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
    width: 16px;
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

export const FormBox = styled.div`
  max-width: 800px;
  margin: auto;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  box-sizing: border-box;
  text-align: center;
  align-items: center;
`;

export const InputWrapper = styled.div`
  margin: 10px auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const InputLabel = styled.div`
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  height: 45px;
  border: none;
  border-bottom: 1px solid #e5e5e5;
`;

export const DisabledInput = styled(Input)`
  background-color: #f0f0f0;
`;

export const Button = styled.button`
  width: 100%;
  height: 45px;
  margin: 10px;
  border: none;
  font-weight: 900;
  cursor: pointer;
`;

export const Payment = styled.div`
  margin-top: 40px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  font-weight: 700;
  text-align: left;
  width: 100%;
  @media (max-width: 980px) {
    margin: auto;
    width: 100%;
    max-width: 1400px;
  }
`;

export const PaymentBox = styled.div`
  padding: 24px 0px;
  color: #5a5a5a;
`;

export const PaymentLine = styled.div`
  border-bottom: 1px solid #ddd;
  width: 100%;
  margin: 20px 0;
`;
export const PaymentPriceBox = styled.div`
  margin-top: 4px;
  display: flex;
  justify-content: space-between;
`;
