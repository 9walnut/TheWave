import React, { useState, useEffect } from "react";

import AdminGraph from "./AdminGraph";

const DUMMY = [
  { id: "커스텀풍선", categoryName: "categoryCustom", value: 324 },
  { id: "용돈풍선", categoryName: "categoryMoney", value: 88 },
  { id: "브라이덜샤워", categoryName: "categoryBridal", value: 221 },
  { id: "생일용품", categoryName: "categoryBirth", value: 178 },
];
console.log(DUMMY);

function OrderCategory({ categoryCount }) {
  const { categoryCustom, categoryMoney, categoryBridal, categoryBirth } =
    categoryCount;

  useEffect(() => {
    console.log("✅통계 커스텀풍선 categoryCustom", categoryCustom);
    console.log("✅통계 용돈풍선 categoryMoney", categoryMoney);
    console.log("✅통계 브라이덜샤워 categoryBridal", categoryBridal);
    console.log("✅통계 생일용품 categoryBirth", categoryBirth);
  }, [categoryCustom, categoryMoney, categoryBridal, categoryBirth]);

  return (
    <>
      <h3>거래 카테고리 통계</h3>

      <AdminGraph getData={DUMMY} />
    </>
  );
}

export default OrderCategory;
