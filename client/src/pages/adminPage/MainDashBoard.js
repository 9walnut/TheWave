import React from "react";

import * as S from "../../styles/adminPage/MainDashBoard.js";

import Card from "../../shared/adminPage/components/Card";

function MainDashBoard() {
  return (
    <>
      <S.AdminPageMainLayout>
        <S.StyledCard>1</S.StyledCard>
        <S.StyledCard>2</S.StyledCard>
        <S.StyledCard>3</S.StyledCard>
        <S.StyledCard>4</S.StyledCard>
      </S.AdminPageMainLayout>
    </>
  );
}

export default MainDashBoard;
