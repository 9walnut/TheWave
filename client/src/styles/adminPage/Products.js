import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 5px 30px 5px 30px;
  @media (max-width: 396px) {
    padding: 0;
    margin-top: 5px;
  }
`;
export const SearchButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 396px) {
    padding: 0;
    margin-top: 5px;
  }
`;

export const InnerCardTitleBox = styled.div`
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
