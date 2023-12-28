import * as S from "./AdminButtonNavBackStyle.js";
import { useNavigate } from "react-router-dom";
import React from "react";

function AdminButtonNavBack() {
  const navigator = useNavigate();

  return (
    <S.AdminButtonNavBackBox onClick={() => navigator(-1)}>
      <img src="/adminPage/backArrow.svg" alt="backArrow" />
    </S.AdminButtonNavBackBox>
  );
}

export default AdminButtonNavBack;
