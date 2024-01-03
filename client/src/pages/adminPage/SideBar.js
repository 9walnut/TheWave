import React from "react";
import { NavLink } from "react-router-dom";

import * as S from "../../styles/adminPage/SideBar.js";

import ListItem from "../../shared/adminPage/components/ListItem";

function SideBar({ selectItem }) {
  //여기서 발생한 이벤트가 AdminPageMain으로 넘어감
  //각 아이템이 클릭될 때 AdminPageMain의 상태 업데이트 (setSelectedItem 사용)
  const handleItemClick = (item) => {
    selectItem(item);
  };

  //exact="true" : 경로가 정확히 일치할 때만 해당 링크 활성화
  return (
    <S.SideBarBox>
      <S.NavLinksLayout>
        <NavLink
          to="/admin"
          exact="true"
          onClick={() => handleItemClick("mainDashboard")}
        >
          <S.NavListItem className="nav-link">
            <ListItem
              icon="/adminPage/sidebar/home.svg"
              arrow="/adminPage/sidebar/none.svg"
            >
              ADMIN
            </ListItem>
          </S.NavListItem>
        </NavLink>
      </S.NavLinksLayout>
      <S.NavLinksLayout>
        <S.StyledNavLink
          to="/admin/dashboard"
          exact={true}
          onClick={() => handleItemClick("mainDashboard")}
        >
          <S.NavListItem className="nav-link">
            <ListItem
              icon="/adminPage/sidebar/dashboard.svg"
              arrow="/adminPage/sidebar/arrow.svg"
            >
              대시 보드
            </ListItem>
          </S.NavListItem>
        </S.StyledNavLink>
        <S.StyledNavLink
          to="/admin/products"
          exact={true}
          activeClassName="active"
        >
          <S.NavListItem className="nav-link">
            <ListItem
              icon="/adminPage/sidebar/products.svg"
              arrow="/adminPage/sidebar/arrow.svg"
            >
              상품 관리
            </ListItem>
          </S.NavListItem>
        </S.StyledNavLink>
        <S.StyledNavLink to="/admin/orders" exact={true}>
          <S.NavListItem className="nav-link">
            <ListItem
              icon="/adminPage/sidebar/orders.svg"
              arrow="/adminPage/sidebar/arrow.svg"
            >
              거래 내역 관리
            </ListItem>
          </S.NavListItem>
        </S.StyledNavLink>
        <S.StyledNavLink
          to="/admin/users"
          exact={true}
          onClick={() => handleItemClick("users")}
        >
          <S.NavListItem className="nav-link">
            <ListItem
              icon="/adminPage/sidebar/users.svg"
              arrow="/adminPage/sidebar/arrow.svg"
            >
              회원관리
            </ListItem>
          </S.NavListItem>
        </S.StyledNavLink>
      </S.NavLinksLayout>
      <S.NavLinksLayout>
        <NavLink to="/">
          <S.NavListItem className="nav-link">
            <ListItem
              icon="/adminPage/sidebar/exit.svg"
              arrow="/adminPage/sidebar/none.svg"
            >
              나가기
            </ListItem>
          </S.NavListItem>
        </NavLink>
      </S.NavLinksLayout>
    </S.SideBarBox>
  );
}

export default SideBar;
