import React from "react";

import * as S from "./ListItemStyle.js";

function ListItem(props) {
  return (
    <S.ListItem>
      <S.ListIconImg src={props.icon} alt="Icon" className="list-icon" />
      <S.ListItemBox>{props.children}</S.ListItemBox>
      <S.ListIconImg src={props.arrow} alt="arrow" className="list-arrow" />
    </S.ListItem>
  );
}

export default ListItem;
