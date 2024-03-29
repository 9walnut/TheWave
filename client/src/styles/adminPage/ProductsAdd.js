import styled from "styled-components";

export const PageWrapper = styled.div`
  height: 93vh;
  width: 74vw;
  position: relative;
  @media (max-width: 396px) {
    width: 95vw;
    margin-bottom: 60px;
  }
`;

export const ProductsLayout1 = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 0.8fr;
  grid-gap: 10px;
  height: 600px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-gap: 1px;
    height: auto;
    align-items: center;
    align-content: center;
    margin-bottom: 5px;
  }
  @media (max-width: 396px) {
    grid-template-columns: 1fr;
    grid-gap: 1px;
    height: auto;
    align-items: center;
    align-content: center;
  }
`;

export const Box1 = styled.div`
  background-color: none;
  margin-bottom: 5px;
`;

export const Box2 = styled.div`
  background-color: none;
  margin-bottom: 5px;
`;
export const ProductsLayout2 = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 0.8fr;
  grid-gap: 10px;
  height: 100%;
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-gap: 1px;
    height: auto;
    align-items: center;
    align-content: center;
  }
  @media (max-width: 396px) {
    grid-template-columns: 1fr;
    grid-gap: 10px;
    height: auto;
  }
`;

export const Box3 = styled.div`
  background-color: none;
  @media (max-width: 767px) {
    margin-bottom: 5px;
  }
  @media (max-width: 396px) {
    margin-left: 20px;
    height: auto;
    margin-bottom: 65px;
  }
`;

export const Box4 = styled.div`
  background-color: none;
  @media (max-width: 767px) {
    margin-bottom: 5px;
  }
  @media (max-width: 396px) {
    margin-left: 20px;
    height: auto;
  }
`;

export const TitleBox = styled.div`
  box-shadow: 2px 11px 14px -4px #fafbff;
  border-radius: 8px;
  padding: 1rem;
  height: 72px;
  width: 1665px;
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
    margin-left: 20px;
  }
  @media (max-width: 396px) {
    font-size: smaller;
    padding-top: -20px;
    width: 80vw;
  }
`;
export const SubTitleBox = styled.div`
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
  font-weight: 600;
  margin-bottom: 10px;
  @media (max-width: 767px) {
    width: 100%;
    margin-top: 5px;
    text-align: center;
    padding-top: 7px;
  }
  @media (max-width: 396px) {
    font-size: smaller;
  }
`;

export const SubjectBox = styled.div`
  margin-bottom: 12px;
  color: #6e7f8d;
  font-size: large;
  font-weight: 900;
  margin-left: 19px;
  @media (max-width: 396px) {
    font-size: x-small;
    width: 80vw;
    text-align: center;
    margin-left: 0px;
    margin-bottom: 30px;
  }
`;

export const SendDataBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 396px) {
    bottom: 0;
    margin-bottom: 20px;
  }
`;

export const AlertMsgBox = styled.span`
  width: auto;
  height: auto;
  margin-left: 30px;
  font-weight: 500;
  color: #4681ad;
  border-bottom: 1px solid #4681ad;
  @media (max-width: 396px) {
    font-size: xx-small;
    margin-left: 4px;
  }
`;
