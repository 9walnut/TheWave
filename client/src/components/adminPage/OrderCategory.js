import React, { useState, useEffect } from "react";

import AdminGraphPie from "./AdminGraphPie";
import CardTitle from "../../shared/adminPage/components/CardTitle";
import * as S from "./GraphBoxStyle";

function OrderCategory({ categoryCount }) {
  const {
    categoryCharaterSale,
    categoryDaisySale,
    categoryLetteringSale,
    categoryMoneySale,
    categoryOmbreSale,
    categoryRoseSale,
    categoryTulipSale,
  } = categoryCount;

  const categoryCountData = [
    {
      id: "캐릭터",
      categoryName: "categoryCharaterSale",
      value: categoryCharaterSale,
    },
    {
      id: "데이지",
      categoryName: "categoryDaisySale",
      value: categoryDaisySale,
    },
    {
      id: "레터링",
      categoryName: "categoryLetteringSale",
      value: categoryLetteringSale,
    },
    { id: "용돈", categoryName: "categoryMoneySale", value: categoryMoneySale },
    {
      id: "옴브레",
      categoryName: "categoryOmbreSale",
      value: categoryOmbreSale,
    },
    { id: "장미", categoryName: "categoryRoseSale", value: categoryRoseSale },
    { id: "튤립", categoryName: "categoryTulipSale", value: categoryTulipSale },
  ];

  useEffect(() => {}, [
    categoryCharaterSale,
    categoryDaisySale,
    categoryLetteringSale,
    categoryMoneySale,
    categoryOmbreSale,
    categoryRoseSale,
    categoryTulipSale,
  ]);

  return (
    <>
      <CardTitle>거래 카테고리 통계</CardTitle>
      <S.CenteredPieWrapper>
        <S.PieGraphBox>
          <AdminGraphPie getData={categoryCountData} />
        </S.PieGraphBox>
      </S.CenteredPieWrapper>
    </>
  );
}

export default OrderCategory;
