import styled from "styled-components";

export const ButtonContainer = styled.div`
  @media (max-width: 390px) {
    padding-bottom: -10px;
  }
`;

export const InnerCardTitleBox = styled.div`
  /* background-color: #e9eff4; */
  /* border: 0px solid #e0e0e0; */
  box-shadow: 2px 11px 14px -4px #fafbff;
  border-radius: 8px;
  padding: 1rem;
  height: 72px;
  width: 682px;
  margin-top: 10px;
  text-align: left;
  padding-top: 21px;
  color: #6e7f8d;
  font-size: x-large;
  font-weight: 900;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 30px;
  margin-left: 25px;
  @media (max-width: 390px) {
    font-size: smaller;
    margin-top: -10px;
    border: none;
    height: 55px;
    width: 331px;
    border-bottom: 1px solid #e0e0e0;
    margin-left: -15px;
    box-shadow: none;
    border-radius: 0;
    margin-bottom: 5px;
  }
`;
