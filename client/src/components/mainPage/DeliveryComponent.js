function DeliveryComponent({ orderList }) {
  const countDeliveryStatus = (status) => {
    return orderList.filter((order) => order.orderStatus === status).length;
  };
  return (
    <>
      <div>
        <h3>배송 상태</h3>
        <p>배송 대기 중{countDeliveryStatus(1)}</p>
        <p>배송 중{countDeliveryStatus(2)}</p>
        <p>배송 완료{countDeliveryStatus(3)}</p>
      </div>
    </>
  );
}

export default DeliveryComponent;
