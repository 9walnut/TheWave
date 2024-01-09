import styled from "styled-components";

export const FormBox = styled.div`
  padding: 100px 0px;
  margin: auto;
  display: flex;
  height: 100%;
  width: 50%;
  flex-direction: column;
  box-sizing: border-box;
  text-align: center;
  align-items: center;
`;

export const LoginHead = styled.div`
  font-size: 32px;
  font-weight: 900;
`;

export const Input = styled.input`
  margin: 10px auto;
  color: black;
  width: 300px;
  height: 45px;
  border: none;
  border-bottom: 1px solid #e5e5e5;
`;

export const ButtonContainer = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  width: 300px;
  height: 45px;
  margin: 10px;
  border: none;
  font-weight: 900;
  cursor: pointer;
`;

export const FindButton = styled(Button)`
  background-color: white;
  text-align: left;
  margin: 0px;
  width: 90px;
  cursor: pointer;
`;

export const RegisterButton = styled(Button)`
  background-color: white;
  text-align: right;
  margin: 0px;
  width: 100px;
  font-weight: 900;
  cursor: pointer;
`;

export const ButtonGroup = styled.div`
  display: inline-block;
`;

export const RegisterGroup = styled.div`
  display: inline-block;
`;
