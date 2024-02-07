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
  // console.log(dailyOutStatus[0]);
  // console.log(dailyOutStatus[0].outDate);
  // console.log(dailyOutStatus[0].count);

  // const categorySalesData = dailyOutStatus.map((data) => ({
  //   outDate: data.outDate,
  //   count: data.count,
  // }));

  //-----마지막에 들어온 7개만 데이터로 사용
  const categorySalesData = dailyOutStatus
    .slice()
    .reverse()
    .slice(0, 7)
    .map((data) => ({ outDate: data.outDate, count: data.count }));

  // console.log(categorySalesData);
  return (
    <>
      <CardTitle>일자별 판매량</CardTitle>
      <S.CenteredChartWrapper>
        <S.ChartGraphBox>
          <AdminGraphChart getData={categorySalesData} />
        </S.ChartGraphBox>
      </S.CenteredChartWrapper>
    </>
  );
}

export default CategorySales;
