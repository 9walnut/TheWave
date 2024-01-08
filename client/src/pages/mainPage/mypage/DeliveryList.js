import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "../../../styles/mainPage/mypage.style";
import getAccessToken from "../../../hooks/getAcessToken";
import DeliveryComponent from "../../../components/mainPage/DeliveryListComponent";
function DeliveryList() {
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
          const { orderList } = res.data;
          setOrderList(orderList);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);
  return (
    <>
      <DeliveryComponent orderList={orderList} />
    </>
  );
}
export default DeliveryList;
