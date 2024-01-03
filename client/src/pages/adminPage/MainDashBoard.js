import React, { useEffect, useState } from "react";
import axios from "axios";

import MonthlyOrder from "../../components/adminPage/MonthlyOrder.js";
import CurrentProductStatus from "../../components/adminPage/CurrentProductStatus.js";
import OrderCategory from "../../components/adminPage/OrderCategory.js";
import CategorySales from "../../components/adminPage/CategorySales.js";

import * as S from "../../styles/adminPage/MainDashBoard.js";
import Card from "../../shared/adminPage/components/Card";

function MainDashBoard() {
  //---axios get
  const [totalOrders, setTotalOrders] = useState("");
  const [totalOrderPrices, setTotalOrderPrices] = useState("");
  const [deliveryCompleteOrders, setDeliveryCompleteOrders] = useState("");
  const [deliveryReadyOrders, setDeliveryReadyOrders] = useState("");
  const [totalProducts, setTotalProducts] = useState("");
  const [categoryCount, setCategoryCount] = useState("");
  const [dailyOutStatus, setDailyOutStatus] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/admin");

      // console.log("response.data", response);
      console.log("response.data", response.data);

      setTotalOrders(response.data.totalOrders);
      setTotalOrderPrices(response.data.totalOrderPrices);
      setDeliveryCompleteOrders(response.data.deliveryCompleteOrders);
      setDeliveryReadyOrders(response.data.deliveryReadyOrders);
      setTotalProducts(response.data.totalProducts);
      setCategoryCount(response.data.categoryCount);
      setDailyOutStatus(response.data.dailyOutStatus);
    } catch (error) {
      console.log("에러", error);
    }
  };

  // console.log("totalOrders", totalOrders);
  // console.log("totalOrderPrices", totalOrderPrices);
  // console.log("deliveryCompleteOrders", deliveryCompleteOrders);
  // console.log("deliveryReadyOrders", deliveryReadyOrders);
  // console.log("totalProducts", totalProducts);
  // console.log("categoryCount", categoryCount);
  // console.log("dailyOutStatus", dailyOutStatus);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Card>
        <S.AdminPageMainLayout>
          <S.StyledCard>
            <MonthlyOrder
              totalOrders={totalOrders}
              totalOrderPrices={totalOrderPrices}
              deliveryCompleteOrders={deliveryCompleteOrders}
              deliveryReadyOrders={deliveryReadyOrders}
            />
          </S.StyledCard>
          <S.StyledCard>
            <CurrentProductStatus totalProducts={totalProducts} />
          </S.StyledCard>
          <S.StyledCard>
            <OrderCategory categoryCount={categoryCount} />
          </S.StyledCard>
          <S.StyledCard>
            {/* {dailyOutStatus && (
              <CategorySales dailyOutStatus={dailyOutStatus} />
            )} */}
          </S.StyledCard>
        </S.AdminPageMainLayout>
      </Card>
    </>
  );
}

export default MainDashBoard;
