import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function MyPage() {
  const { isAdmin, accessToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    if (accessToken) {
      const getData = async () => {
        try {
          const headers = {
            Authorization: `Bearer ${accessToken}`,
          };

          const res = await axios.get("/mypage", { headers });
          if (res.data.orderList) {
            setOrderList(res.data.orderList);
          }

          console.log(res.data);
        } catch (error) {
          console.error(error);
        }
      };

      getData();
    }
  }, [accessToken]);

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
