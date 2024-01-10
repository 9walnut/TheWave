import styled from "styled-components";
function DeliveryComponent({ orderList }) {
  const countDeliveryStatus = (status) => {
    return orderList.filter((order) => order.orderStatus === status).length;
  };
  return (
    <>
      <DeliveryStatusContainer>
        <DeliveryStatusTitle>배송 상태</DeliveryStatusTitle>
        <DeliveryStatusBoxes>
          <DeliveryStatusBox>
            <div>배송 대기 중</div>
            <div>{countDeliveryStatus(1)}</div>
          </DeliveryStatusBox>
          <DeliveryStatusBox>
            <div>배송 중</div>
            <div>{countDeliveryStatus(2)}</div>
          </DeliveryStatusBox>
          <DeliveryStatusBox>
            <div>배송 완료</div>
            <div>{countDeliveryStatus(3)}</div>
          </DeliveryStatusBox>
        </DeliveryStatusBoxes>
      </DeliveryStatusContainer>
    </>
  );
}

const DeliveryStatusContainer = styled.div`
  text-align: center;
  margin: 20px 0;
`;

const DeliveryStatusTitle = styled.h3`
  margin-bottom: 20px;
`;

const DeliveryStatusBoxes = styled.div`
  display: flex;
  justify-content: space-around;

  @media (max-width: 980px) {
  }
`;

const DeliveryStatusBox = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  width: 20%;
  margin-bottom: 10px;
  font-size: medium;

  @media (max-width: 980px) {
    border: 1px solid #ccc;
    padding: 5px;
    div {
      font-size: small;
    }
  }
`;

export default DeliveryComponent;
