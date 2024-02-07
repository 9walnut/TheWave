import styled from "styled-components";

export const TitleBox = styled.div`
  box-shadow: 2px 11px 14px -4px #fafbff;
  border-radius: 8px;
  padding: 1rem;
  height: 72px;
  width: 1000px;
  margin-top: 10px;
  text-align: left;
  padding-top: 21px;
  color: #5e748f;
  font-size: x-large;
  font-weight: 900;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 30px;
  @media (max-width: 767px) {
    width: 100%;
    margin-top: 5px;
    text-align: center;
    padding-top: 7px;
  }
  @media (max-width: 396px) {
    font-size: smaller;
    padding-top: -20px;
  }
`;

export const SubTitleBox = styled.div`
  padding: 1rem;
  height: 72px;
  width: 200px;
  margin-top: 10px;
  text-align: left;
  padding-top: 21px;
  color: #6e7f8d;
  font-size: larger;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;
  @media (max-width: 767px) {
    width: 100%;
    margin-top: 5px;
    text-align: center;
    padding-top: 7px;
  }
  @media (max-width: 396px) {
    font-size: smaller;
    height: 4vh;
  }
`;

export const OrdersDetailLayout1 = styled.div`
  display: flex;
  justify-content: space-between;

  align-items: center;
  justify-content: center;
  padding: 20px;

  position: relative;
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    width: 90vw;
    align-items: center;
    align-content: center;
  }
`;

export const Box1 = styled.div`
  background-color: none;
  margin-left: -30px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const Box2 = styled.div`
  background-color: none;
  margin-left: 28px;
`;

export const ItemBox = styled.div`
  width: 880px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 13px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  padding: 10px;
  margin-bottom: 5px;
  margin-left: 5px;
  display: flex;
  align-items: center;
  padding-top: 23px;
  @media (max-width: 767px) {
    width: 87vw;
    height: 4vh;
    padding: 10px;
    margin-bottom: 5px;
    margin-left: 5px;
    padding-top: 23px;
  }
  @media (max-width: 396px) {
    font-size: smaller;
    height: auto;
    width: 90vw;
    display: flex;
    text-align: center;
    flex-direction: column;
    padding-top: 5px;
    margin-left: -40px;
  }
`;
export const ItemTitle = styled.div`
  margin-bottom: 12px;
  color: #6e7f8d;
  font-size: large;
  font-weight: 900;
  margin-left: 5px;
  width: 150px;
  @media (max-width: 396px) {
    font-size: smaller;
    text-align: center;
    margin-left: 0;
  }
`;

export const ItemContent = styled.div`
  margin-bottom: 12px;
  color: #6e7f8d;
  margin-left: 60px;
  text-align: left;
  @media (max-width: 396px) {
    font-size: smaller;
    text-align: center;
    margin-left: 0;
    margin-bottom: 0px;
  }
`;

export const OrderProductImgBox = styled.div`
  box-shadow: 2px 11px 14px -4px #fafbff;
  border-radius: 8px;
  width: 400px;
  height: 300px;
  padding-top: 21px;
  color: #6e7f8d;
  text-align: center;
  font-weight: 900;
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const BtnWrapper = styled.div`
  display: flex;
  margin: 70px 0px 10px 0px;
  justify-content: center;
`;
