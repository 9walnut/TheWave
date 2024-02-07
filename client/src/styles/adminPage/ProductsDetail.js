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

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  padding: 5px 30px 5px 30px;
  @media (max-width: 767px) {
    justify-content: center;
  }
  @media (max-width: 396px) {
    bottom: 0;
  }
`;

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
  box-shadow: 2px 11px 14px -4px #fafbff;
  border-radius: 8px;
  padding: 1rem;
  height: 3vh;
  width: 35vw;

  margin-top: 10px;
  text-align: center;
  padding-top: 5px;
  color: #6e7f8d;
  font-size: large;
  font-weight: 600;
  margin-bottom: 10px;
  @media (max-width: 767px) {
    width: 100%;
    margin-top: 15px;
    text-align: center;
    padding-top: 20px;
  }
  @media (max-width: 396px) {
    font-size: smaller;
  }
`;
export const SubTitleWideBox = styled.div`
  box-shadow: 2px 11px 14px -4px #fafbff;
  border-radius: 8px;
  padding: 1rem;
  height: 3vh;
  width: 70vw;

  margin-top: 10px;
  text-align: left;
  padding-top: 5px;
  color: #6e7f8d;
  font-size: large;
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
export const ProductsLayout1 = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 0.8fr;
  grid-gap: 3px;
  height: 40vh;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    width: 90vw;
    align-items: center;
    align-content: center;
    grid-template-columns: 1fr;
  }
`;
export const ProductsLayout2 = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 0.8fr;
  grid-gap: 3px;
  height: auto;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    width: 90vw;
    align-items: center;
    align-content: center;
    grid-template-columns: 1fr;
  }
`;
export const Box1 = styled.div`
  width: 36vw;
  height: 30vh;
  background-color: none;

  @media (max-width: 767px) {
    align-items: center;
    width: 85vw;
    margin-top: 10px;
    height: auto;
  }
  @media (max-width: 396px) {
    width: 80vw;
    height: auto;
  }
`;

export const Box2 = styled.div`
  background-color: none;
  width: 36vw;
  height: auto;
  @media (max-width: 767px) {
    width: 89vw;
    margin-top: 35px;
    height: auto;
  }
  @media (max-width: 396px) {
    width: 90vw;
    height: auto;
  }
`;

export const Box3 = styled.div`
  height: 25vh;
  width: 25vw;
  background-color: none;
  align-items: center;
  justify-content: center;
  align-content: center;
  margin-left: 10%;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 85vw;
    height: auto;
    margin-left: 0px;
  }
  @media (max-width: 396px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80vw;
    height: auto;
    margin-left: 14px;
    margin: auto;
  }
`;

export const ItemBox = styled.div`
  width: 35vw;
  height: auto;
  flex-shrink: 0;
  border-radius: 13px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  padding: 10px;
  margin-bottom: 8px;
  margin-left: 5px;
  display: flex;
  align-items: center;
  padding-top: 23px;
  @media (max-width: 767px) {
    width: 87vw;
    height: auto;
    padding: 10px;
    margin-bottom: 5px;
    margin-left: 5px;
    padding-top: 23px;
  }
  @media (max-width: 396px) {
    font-size: smaller;
    height: auto;
    width: 85vw;
    display: flex;
    text-align: center;
    flex-direction: column;
    padding-top: 5px;
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
