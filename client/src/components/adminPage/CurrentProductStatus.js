import ListItem from "../../shared/adminPage/components/ListItem";
import CardTitle from "../../shared/adminPage/components/CardTitle";
import * as S from "./MonthlyOrderStyle";

function CurrentProductStatus({ totalProducts, soldoutProducts }) {
  return (
    <>
      <CardTitle>현재 상품 현황</CardTitle>
      <S.ItemWrapper>
        <S.ListItemBox>
          <S.IconContainer>
            <img src="/adminPage/dashBoard/itemAll.svg" alt="icon" />
          </S.IconContainer>
          <S.TitleContainer>전체 상품 수</S.TitleContainer>
          <S.ResultContainer> {totalProducts}</S.ResultContainer>
        </S.ListItemBox>
        <S.ListItemBox>
          <S.IconContainer>
            <img src="/adminPage/dashBoard/itemNo.svg" alt="icon" />
          </S.IconContainer>
          <S.TitleContainer>품절 상품 수</S.TitleContainer>
          <S.ResultContainer>{soldoutProducts}</S.ResultContainer>
        </S.ListItemBox>
      </S.ItemWrapper>
    </>
  );
}

export default CurrentProductStatus;
