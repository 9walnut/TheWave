import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as S from "../../styles/adminPage/OrdersDetail.js";
import Card from "../../shared/adminPage/components/Card";

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

  const address = order.userNumber_user.addresses[0].address;
  console.log(address); //부산광역시 해운대구 샘플로 456

  return (
    <>
      <Card>
        <h3>거래 내역 상세 페이지</h3>
        <hr />

        <h3>주문 상품 정보</h3>
        <div>주문 상품: {order.product.productName}</div>
        <div>주문 수량: {order.orderQuantity}</div>
        <div>주문 상품 디테일 color: {order.color}</div>
        <div>주문 상품 디테일 size: {order.size}</div>
        <hr />

        <h3>배송 정보</h3>
        <div>수령자 성함: {order.receiveName}</div>
        <div>주소: {order.address}</div>
        <div>배송 요청사항: {order.deliveryRequest}</div>
        <hr />

        <h3>구매자 정보</h3>
        <div>주문 고객 성함: {order.userNumber_user.userName}</div>
        <div>주문 고객 주소: {address}</div>
        {/* <div>주문 고객 주소: {order.userNumber_user.addresses[0].address}</div> */}
        <hr />

        <h3>거래 정보</h3>
        <div>주문 날짜: {order.orderDate}</div>
        <div>orderStatus: {order.orderStatus}</div>
        <hr />
      </Card>
    </>
  );
}

export default OrdersDetail;
