function DeliveryComponent({ orderList }) {
  const getStatusText = (orderStatus) => {
    switch (orderStatus) {
      case 1:
        return "배송 대기 중";
      case 2:
        return "배송 중";
      case 3:
        return "배송 완료";
      default:
        return "몰 루";
    }
  };

  return (
    <>
      <h3>주문 목록</h3>
      {orderList.map((order, index) => (
        <div key={index}>
          <p>주문일자: {order.orderDate}</p>
          <p>주문수량: {order.orderQuantity}</p>
          <p>총 가격: {order.totalPrice}</p>
          <p>배송 상태: {getStatusText(order.orderStatus)}</p>
        </div>
      ))}
    </>
  );
}

export default DeliveryComponent;
