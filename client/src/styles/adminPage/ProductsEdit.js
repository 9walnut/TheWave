import styled from "styled-components";

export const ProductsLayout1 = styled.div`
  /* background-color: #eff2f9; */
  display: grid;
  grid-template-columns: 0.8fr 0.8fr;
  grid-gap: 10px;
  height: 600px;

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
  /* background-color: red; */
`;

export const Box2 = styled.div`
  background-color: none;
  /* background-color: blue; */
`;
export const ProductsLayout2 = styled.div`
  /* background-color: #eff2f9; */
  display: grid;
  grid-template-columns: 0.8fr 0.8fr;
  grid-gap: 10px;
  height: 100%;
  /* margin-top: 300px; */
  @media (max-width: 396px) {
    grid-template-columns: 1fr;
    grid-gap: 10px;
    height: auto;
  }
`;

export const Box3 = styled.div`
  background-color: none;
  /* background-color: yellow; */
  @media (max-width: 396px) {
    margin-left: 20px;
  }
`;

export const Box4 = styled.div`
  background-color: none;
  /* background-color: green; */
  /* margin: 20px;
  margin-top: 45px; */
  @media (max-width: 396px) {
    margin-left: 20px;
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
    /* height: auto; */
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
    /* height: auto; */
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
    font-size: xx-small;
    width: 80vw;
    text-align: center;
    margin-left: 0px;
  }
`;

export const sendDataBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 396px) {
    bottom: 0;
    margin-bottom: 20px;
  }
`;

export const ThumbnailBox = styled.div`
  /* background-color: #e9eff4; */
  /* border: 0px solid #e0e0e0; */
  box-shadow: 2px 11px 14px -4px #fafbff;
  border-radius: 8px;
  height: 300px;
  width: 300px;
  margin-top: 10px;
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
  @media (max-width: 396px) {
    margin-left: 0px;
  }
`;

export const AlertMsgBox = styled.span`
  /* background-color: blue; */
  width: auto;
  height: auto;
  margin-left: 30px;
  font-weight: 500;
  color: #4681ad;
  border-bottom: 1px solid #4681ad;
  @media (max-width: 396px) {
    font-size: smaller;
  }
`;
