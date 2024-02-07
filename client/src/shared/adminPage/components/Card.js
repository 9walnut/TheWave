import React from "react";

import * as S from "./CardStyle.js";

import AdminButtonNavBack from "../../../components/adminPage/AdminButtonNavBack.js";

function Card({ children }) {
  return (
    <S.CardBox>
      <AdminButtonNavBack />
      {children}
    </S.CardBox>
  );
}

export default Card;
