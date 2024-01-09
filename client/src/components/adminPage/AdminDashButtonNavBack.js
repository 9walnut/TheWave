import * as S from "./AdminDashButtonNavBackStyle.js";
import { useNavigate } from "react-router-dom";
import React from "react";

function AdminDashButtonNavBack() {
  const navigator = useNavigate();

  return (
    <S.AdminDashButtonNavBackBox onClick={() => navigator(-1)}>
      <img src="/adminPage/backArrow.svg" alt="backArrow" />
    </S.AdminDashButtonNavBackBox>
  );
}

export default AdminDashButtonNavBack;
