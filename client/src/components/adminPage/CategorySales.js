import React, { useState, useEffect } from "react";
import AdminGraphChart from "./AdminGraphChart";

// const DUMMY = [
//   { outDate: "2024-01-03", count: 120 },
//   { outDate: "2024-01-04", count: 220 },
//   { outDate: "2024-01-05", count: 320 },
// ];

function CategorySales({ dailyOutStatus }) {
  console.log(dailyOutStatus[0]);
  // console.log(dailyOutStatus[0].outDate);
  // console.log(dailyOutStatus[0].count);

  const categorySalesData = dailyOutStatus.map((data) => ({
    outDate: data.outDate,
    count: data.count,
  }));

  console.log(categorySalesData);
  return (
    <>
      <h3>일자별 판매량</h3>
      <AdminGraphChart getData={categorySalesData} />
    </>
  );
}

export default CategorySales;
