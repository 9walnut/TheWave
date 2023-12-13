import React from "react";

import MonthlyOrder from "../../components/adminPage/MonthlyOrder.js";
import CurrentProductStatus from "../../components/adminPage/CurrentProductStatus.js";
import OrderCategory from "../../components/adminPage/OrderCategory.js";
import CategorySales from "../../components/adminPage/CategorySales.js";

import * as S from "../../styles/adminPage/MainDashBoard.js";

import Card from "../../shared/adminPage/components/Card";

function MainDashBoard() {
  return (
    <>
      <Card>
        <S.AdminPageMainLayout>
          <S.StyledCard>
            <MonthlyOrder />
          </S.StyledCard>
          <S.StyledCard>
            <CurrentProductStatus />
          </S.StyledCard>
          <S.StyledCard>
            <OrderCategory />
          </S.StyledCard>
          <S.StyledCard>
            <CategorySales />
          </S.StyledCard>
        </S.AdminPageMainLayout>
      </Card>
    </>
  );
}

export default MainDashBoard;
