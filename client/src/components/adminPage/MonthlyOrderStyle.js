import styled from "styled-components";

export const OrderItemWrapper = styled.div`
  /* background-color: darkblue; */
  position: relative;
  width: 100%;
  align-content: center;
  height: 129px;
  margin-top: 59px;

  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 60%;
    margin: 59px auto;
  }
`;
export const ProductItemWrapper = styled.div`
  /* background-color: blue; */
  position: relative;

  width: 100%;
  align-content: center;
  height: 129px;
  margin-top: 85px;

  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 60%;
    margin: 59px auto;
  }
`;

export const ListItemBox = styled.div`
  margin-bottom: 11px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  display: flex;
  width: 250px;
  /* background-color: red; */

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0px;
  }
`;

export const IconContainer = styled.div`
  margin-left: 10px;
  & img {
    width: 24px;
    height: 24px;
  }
`;

export const TitleContainer = styled.div`
  margin-left: 7px;
  @media (max-width: 390px) {
    font-size: smaller;
  }
`;
export const ResultContainer = styled.div`
  text-align: left;
  margin-left: auto;
  @media (max-width: 390px) {
    font-size: smaller;
  }
`;
