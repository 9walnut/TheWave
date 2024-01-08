import styled from "styled-components";

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
        <OrderItem key={index}>
          <OrderContainer>
            <OrderInfo>
              <div style={{ textAlign: "center", marginBottom: "5px" }}>
                주문일자: {order.orderDate}
              </div>
              <ProductInfo>
                <div>
                  <Image src={order.product.thumbnailUrl} alt="Product Image" />
                  <ProductName>{order.product.productName}</ProductName>
                </div>
                <div>
                  <div>주문수량: {order.orderQuantity}</div>
                  <div>총 가격: {order.totalPrice}</div>
                  <div>{getStatusText(order.orderStatus)}</div>
                </div>
              </ProductInfo>
            </OrderInfo>
          </OrderContainer>
        </OrderItem>
      ))}
    </>
  );
}
const OrderContainer = styled.div`
  display: flex;
  /* align-items: center; */
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
`;

const OrderInfo = styled.div`
  flex: 1;
  margin-left: 10px;
`;

const OrderItem = styled.div`
  margin-bottom: 20px;
`;

const Image = styled.img`
  max-width: 100px;
  max-height: 100px;
  margin-right: 10px;
`;

const ProductInfo = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ProductName = styled.p``;

export default DeliveryComponent;
