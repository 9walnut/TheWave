import React, { useState, useEffect } from "react";
import CardTitle from "../../shared/adminPage/components/CardTitle";
import AdminGraphChart from "./AdminGraphChart";
import * as S from "./GraphBoxStyle";

// const DUMMY = [
//   { outDate: "2024-01-03", count: 120 },
//   { outDate: "2024-01-04", count: 220 },
//   { outDate: "2024-01-05", count: 320 },
// ];

function CategorySales({ dailyOutStatus }) {
  console.log(dailyOutStatus[0]);
  console.log(dailyOutStatus[0].outDate);
  console.log(dailyOutStatus[0].count);

  const categorySalesData = dailyOutStatus.map((data) => ({
    outDate: data.outDate,
    count: data.count,
  }));

  console.log(categorySalesData);
  return (
    <>
      <CardTitle>일자별 판매량</CardTitle>
      <S.ChartGraphBox>
        <AdminGraphChart getData={categorySalesData} />
      </S.ChartGraphBox>
    </>
  );
}

export default CategorySales;
