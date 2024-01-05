import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
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
  font-size: large;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const ProductsLayout1 = styled.div`
  /* background-color: #eff2f9; */
  display: grid;
  grid-template-columns: 0.8fr 0.8fr;
  grid-gap: 10px;
  height: 600px;
`;

export const Box1 = styled.div`
  background-color: none;
  /* background-color: red; */
`;

export const Box2 = styled.div`
  background-color: none;
  /* background-color: blue; */
`;

export const ItemBox = styled.div`
  width: 810px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 13px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  padding: 10px;
  margin-bottom: 12px;
  margin-left: 5px;
  display: flex;
  align-items: center;
  padding-top: 23px;
`;
export const ItemTitle = styled.div`
  margin-bottom: 12px;
  color: #6e7f8d;
  font-size: large;
  font-weight: 900;
  margin-left: 5px;
  width: 150px;
  /* background-color: red; */
`;

export const ItemContent = styled.div`
  margin-bottom: 12px;
  color: #6e7f8d;
  margin-left: 60px;
  text-align: left;
`;
