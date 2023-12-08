import React from "react";

import * as S from "./CardStyle.js";

function Card({ children }) {
  return <S.CardBox>{children}</S.CardBox>;
}

export default Card;
