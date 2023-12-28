import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function MyPage() {
  const { isAdmin, accessToken } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        console.log("try중입니다");

        const headers = {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        };
        const res = await axios.get("http://localhost:8000/mypage", {
          headers,
        });

        if (res.data.orderList) {
          console.log("res.data입니다.", res.data);
          setOrderList(res.data.orderList);
        }

        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      {orderList.map((order, i) => (
        <div key={i}>
          <div>ProductId: {order.productId}</div>
          <div>OrderDate: {order.orderDate}</div>
          <div>OrderQuantity: {order.orderQuantity}</div>
          <div>DeliveryRequest: {order.deliveryRequest}</div>
        </div>
      ))}
    </div>
  );
}

export default MyPage;
