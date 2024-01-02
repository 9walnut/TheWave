import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import * as S from "../../styles/adminPage/OrdersDetail.js";
import Card from "../../shared/adminPage/components/Card";
import ModifiedPhoneNumber from "../../shared/ModifiedPhoneNumber.js";

function OrdersDetail({ orders }) {
  const [order, setOrder] = useState({});
  const { orderId } = useParams();
  console.log("OrdersDetail Params 아이디", orderId);

  const getOrdersDetail = async () => {
    try {
      const response = await axios.get(`/api/admin/orders/${orderId}`);
      console.log("응답오나", response.data);
      setOrder(response.data);
    } catch (error) {
      console.error("상품 불러오기 에러", error);
    }
  };

  useEffect(() => {
    getOrdersDetail();
  }, [orderId]);

  //✅ 데이터테이블에 있는것만 보여주면됨.

  //orderStatus switch
  const getOrderStatus = (status) => {
    switch (status) {
      case 1:
        return "주문";
      case 2:
        return "교환";
      case 3:
        return "환불";
      case 4:
        return "취소";
      default:
        return "알 수 없음";
    }
  };

  return (
    <>
      <Card>
        {order.product && order.userNumber_user && (
          <>
            <h3>거래 내역 상세 페이지</h3>
            <div>orderId: {order.orderId}</div>
            <hr />
            <h3>주문 상품 정보</h3>
            <div>주문 상품명: {order.product.productName}</div>
            <div>주문 수량: {order.orderQuantity}</div>
            <div>주문 상품 디테일 color: {order.color}</div>
            <div>주문 상품 디테일 size: {order.size}</div>
            <hr />
            <h3>배송 정보</h3>
            <div>수령자 성함: {order.userNumber_user.userName}</div>

            {order.userNumber_user.phoneNumber && (
              <div>
                수령자 연락처:{" "}
                <ModifiedPhoneNumber
                  phoneNumber={order.userNumber_user.phoneNumber}
                />
              </div>
            )}

            <div>주소: {order.userNumber_user.addresses[0].address}</div>
            <div>배송 요청사항: {order.deliveryRequest}</div>
            <hr />
            <h3>거래 정보</h3>
            <div>주문 날짜: {order.orderDate}</div>
            <div>orderStatus: {getOrderStatus(order.orderStatus)}</div>
            <div>출고 날짜(changeDate): {order.changeDate}</div>
            <hr />
          </>
        )}
      </Card>
    </>
  );
}

export default OrdersDetail;
