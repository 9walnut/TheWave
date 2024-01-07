import React, { useEffect, useState } from "react";
import axios from "axios";

import * as S from "../../../styles/mainPage/mypage.style";
import getAccessToken from "../../../hooks/getAcessToken";
function MyPageMain() {
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        console.log("try중입니다");

        const headers = getAccessToken();
        const res = await axios.get("/api/mypage", {
          headers,
        });
        if (res.data.orderList) {
          console.log("mypage: ", res.data);
          setOrderList(res.data.orderList);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);
  return (
    <>
      <div>메인화면입니asdassss다.</div>
      {orderList.map((order, i) => (
        <div key={i}>
          <div>ProductId: {order.productId}</div>
          <div>OrderDate: {order.orderDate}</div>
          <div>OrderQuantity: {order.orderQuantity}</div>
          <div>DeliveryRequest: {order.deliveryRequest}</div>
        </div>
      ))}
    </>
  );
}

export default MyPageMain;
