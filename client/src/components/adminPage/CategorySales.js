import React, { useState, useEffect } from "react";
import CardTitle from "../../shared/adminPage/components/CardTitle";
import AdminGraphChart from "./AdminGraphChart";
import * as S from "./GraphBoxStyle";

function CategorySales({ dailyOutStatus }) {
  const categorySalesData = dailyOutStatus
    .slice()
    .reverse()
    .slice(0, 7)
    .map((data) => ({ outDate: data.outDate, count: data.count }));

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
