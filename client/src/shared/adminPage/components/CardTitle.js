import React from "react";

import * as S from "./CardTitleStyle.js";

function CardTitle({ children }) {
  return <S.CardTitleBox>{children}</S.CardTitleBox>;
}

export default CardTitle;
