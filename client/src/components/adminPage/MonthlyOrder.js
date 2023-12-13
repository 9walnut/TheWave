import ListItem from "../../shared/adminPage/components/ListItem";

function MonthlyOrder() {
  return (
    <>
      <h3>이번달 거래 현황</h3>
      <ListItem
        icon="/adminPage/dashBoard/orderAll.svg"
        arrow="/adminPage/sidebar/none.svg"
      >
        거래 수
      </ListItem>
      <ListItem
        icon="/adminPage/dashBoard/orderCancel.svg"
        arrow="/adminPage/sidebar/none.svg"
      >
        거래 취소 수
      </ListItem>
      <ListItem
        icon="/adminPage/dashBoard/orderConfirm.svg"
        arrow="/adminPage/sidebar/none.svg"
      >
        거래 확정 수
      </ListItem>
      <ListItem
        icon="/adminPage/dashBoard/deliveryOk.svg"
        arrow="/adminPage/sidebar/none.svg"
      >
        배송 완료 수
      </ListItem>
    </>
  );
}

export default MonthlyOrder;
