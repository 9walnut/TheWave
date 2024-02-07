import React from "react";

import * as S from "./CardDashBoardStyle.js";

import AdminDashButtonNavBack from "../../../components/adminPage/AdminDashButtonNavBack.js";

function CardDashBoard({ children }) {
  return (
    <S.CardBox>
      <AdminDashButtonNavBack />
      {children}
    </S.CardBox>
  );
}

export default CardDashBoard;
