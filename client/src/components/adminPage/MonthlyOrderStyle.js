import styled from "styled-components";

export const OrderItemWrapper = styled.div`
  /* background-color: darkblue; */
  position: relative;
  width: 100%;
  align-content: center;
  height: 129px;
  margin-top: 59px;

  @media (max-width: 768px) {
    width: 60%;
    margin: 59px auto;
  }
`;
export const ProductItemWrapper = styled.div`
  /* background-color: darkblue; */
  position: relative;
  width: 560px;
  align-content: center;
  height: 129px;
  margin-top: 85px;
  @media (max-width: 768px) {
    width: 60%;
    margin: 59px auto;
  }
`;

export const ListItemBox = styled.div`
  margin: 11px;
  align-items: center;
  display: flex;
  width: 250px;
  /* background-color: red; */
  justify-content: center;
  margin-left: 202px;
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
`;
export const ResultContainer = styled.div`
  text-align: left;
  margin-left: auto;
  @media (max-width: 768px) {
    /* margin-left: 20px; */
  }
`;
