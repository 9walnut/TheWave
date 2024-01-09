import styled from "styled-components";

export const PageWrapper = styled.div`
  height: 93vh;
  width: 74vw;
  /* background-color: yellow; */
  position: relative;
  @media (max-width: 396px) {
    width: 95vw;
    margin-bottom: 60px;
    /* align-items: center; */
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
  /* height: 72px;
  width: 682px; */
  height: 3vh;
  width: 35vw;
  /* background-color: black; */

  margin-top: 10px;
  text-align: center;
  padding-top: 5px;
  color: #6e7f8d;
  font-size: large;
  font-weight: 600;
  margin-bottom: 10px;
  @media (max-width: 767px) {
    /* height: auto; */
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
  /* height: 72px;
  width: 682px; */
  height: 3vh;
  width: 70vw;
  /* background-color: black; */

  margin-top: 10px;
  text-align: center;
  padding-top: 5px;
  color: #6e7f8d;
  font-size: large;
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
export const ProductsLayout1 = styled.div`
  /* background-color: #eff2f9; */
  /* background-color: violet; */
  display: grid;
  grid-template-columns: 0.8fr 0.8fr;
  grid-gap: 3px;
  /* height: 600px; */
  height: 40vh;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    width: 90vw;
    align-items: center;
    /* justify-content: center; */
    align-content: center;
    /* margin: 0 auto; */
  }
`;
// export const ProductsLayout2 = styled.div`
//   background-color: violet;
//   height: 30vh;
//   width: 25vw;

// `;
export const Box1 = styled.div`
  /* background-color: red; */
  width: 36vw;
  height: 30vh;
  background-color: none;

  @media (max-width: 767px) {
    align-items: center;
    width: 85vw;
    margin-top: 10px;
    height: 50vh;
  }
  @media (max-width: 396px) {
    width: 80vw;
    height: 80vh;
    margin-top: -20px;
  }
`;

export const Box2 = styled.div`
  /* background-color: blue; */
  background-color: none;
  width: 36vw;
  height: 40vh;
  @media (max-width: 767px) {
    width: 89vw;
    margin-top: 25px;
  }
  @media (max-width: 396px) {
    width: 90vw;
    margin-top: 50px;
    height: 50vh;
  }
`;

export const Box3 = styled.div`
  /* background-color: green; */
  height: 25vh;
  width: 25vw;
  background-color: none;
  /* display: flex; */
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  align-content: center;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 85vw;
    margin-top: 620px;
    height: 50vh;
  }
  @media (max-width: 396px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80vw;
    height: 50vh;
    margin-left: 14px;
  }
`;

export const ItemBox = styled.div`
  /* width: 810px; */
  width: 35vw;
  height: 4vh;
  /* height: 60px; */
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
    height: 4vh;
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
  /* background-color: red; */
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
