import styled from "styled-components";

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

  @media (max-width: 396px) {
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

export const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 5px 30px 5px 30px;
  @media (max-width: 396px) {
    margin-left: -34px;
    margin-top: -5px;
    padding: 5px 30px 5px 30px;
  }
`;
export const SearchButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 7px;
  margin-right: 5px;
  @media (max-width: 396px) {
    padding: 0;
    margin-top: 5px;
  }
`;

export const Select = styled.select`
  width: 130px;
  height: 42px;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 9px 13px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  @media (max-width: 767px) {
    width: 150px;
  }
  @media (max-width: 396px) {
    font-size: 8px;
    height: 18px;
    width: 92px;
    border-radius: 0;
    padding: 1px 11px;
    font-weight: 200;
  }
`;
