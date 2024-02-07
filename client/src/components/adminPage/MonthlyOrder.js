import ListItem from "../../shared/adminPage/components/ListItem";
import * as S from "./MonthlyOrderStyle";
import CardTitle from "../../shared/adminPage/components/CardTitle";
import ModifiedPrice from "../../shared/ModifiedPrice";

function MonthlyOrder({
  totalOrders,
  totalOrderPrices,
  deliveryCompleteOrders,
  deliveryReadyOrders,
}) {
  return (
    <>
      <CardTitle>이번달 거래 현황</CardTitle>
      <S.OrderItemWrapper>
        <S.ListItemBox>
          <S.IconContainer>
            <img src="/adminPage/dashBoard/orderAll.svg" alt="icon" />
          </S.IconContainer>
          <S.TitleContainer>전체 주문 수</S.TitleContainer>
          <S.ResultContainer> {totalOrders}</S.ResultContainer>
        </S.ListItemBox>
        <S.ListItemBox>
          <S.IconContainer>
            <img src="/adminPage/dashBoard/orderConfirm.svg" alt="icon" />
          </S.IconContainer>
          <S.TitleContainer>총 판매 금액</S.TitleContainer>
          <S.ResultContainer>
            {" "}
            <ModifiedPrice number={totalOrderPrices} />
          </S.ResultContainer>
        </S.ListItemBox>
        <S.ListItemBox>
          <S.IconContainer>
            <img src="/adminPage/dashBoard/deliveryOk.svg" alt="icon" />
          </S.IconContainer>
          <S.TitleContainer>배송 완료 수</S.TitleContainer>
          <S.ResultContainer> {deliveryCompleteOrders}</S.ResultContainer>
        </S.ListItemBox>
        <S.ListItemBox>
          <S.IconContainer>
            <img src="/adminPage/dashBoard/orderCancel.svg" alt="icon" />
          </S.IconContainer>
          <S.TitleContainer>배송 준비 수</S.TitleContainer>
          <S.ResultContainer> {deliveryReadyOrders}</S.ResultContainer>
        </S.ListItemBox>
      </S.OrderItemWrapper>
    </>
  );
}

export default MonthlyOrder;
