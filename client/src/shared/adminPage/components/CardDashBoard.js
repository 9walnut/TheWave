import React from "react";

import * as S from "./CardDashBoardStyle.js";

import AdminButtonNavBack from "../../../components/adminPage/AdminButtonNavBack.js";

function CardDashBoard({ children }) {
  return (
    <S.CardBox>
      <AdminButtonNavBack />

      {children}
    </S.CardBox>
  );
}

export default CardDashBoard;
