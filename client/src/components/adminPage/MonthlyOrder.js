import ListItem from "../../shared/adminPage/components/ListItem";
import * as S from "./MonthlyOrderStyle";

function MonthlyOrder({
  totalOrders,
  totalOrderPrices,
  deliveryCompleteOrders,
  deliveryReadyOrders,
}) {
  return (
    <>
      <h3>이번달 거래 현황</h3>
      <ListItem
        icon="/adminPage/dashBoard/orderAll.svg"
        arrow="/adminPage/sidebar/none.svg"
      >
        총 주문 수 {totalOrders}
      </ListItem>

      <ListItem
        icon="/adminPage/dashBoard/orderConfirm.svg"
        arrow="/adminPage/sidebar/none.svg"
      >
        총 판매 금액 {totalOrderPrices}
      </ListItem>
      <ListItem
        icon="/adminPage/dashBoard/deliveryOk.svg"
        arrow="/adminPage/sidebar/none.svg"
      >
        배송 완료 수 {deliveryCompleteOrders}
      </ListItem>
      <ListItem
        icon="/adminPage/dashBoard/orderCancel.svg"
        arrow="/adminPage/sidebar/none.svg"
      >
        배송 준비 수{deliveryReadyOrders}
      </ListItem>
    </>
  );
}

export default MonthlyOrder;
