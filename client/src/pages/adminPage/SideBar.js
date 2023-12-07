// SideBar.js
import React from "react";
import { NavLink } from "react-router-dom";

import "../../components/adminPage/SideBar.css";

import ListItem from "../../shared/adminPage/components/ListItem";

function SideBar({ selectItem }) {
  //여기서 발생한 이벤트가 AdminPageMain으로 넘어감
  //각 아이템이 클릭될 때 AdminPageMain의 상태 업데이트 (setSelectedItem 사용)
  const handleItemClick = (item) => {
    selectItem(item);
  };

  //exact="true" : 경로가 정확히 일치할 때만 해당 링크 활성화
  return (
    <div className="side-bar">
      <ul className="nav-link">
        <NavLink
          to="/admin"
          exact="true"
          onClick={() => handleItemClick("mainDashboard")}
        >
          <ListItem
            icon="/adminPage/sidebar/out.svg"
            arrow="/adminPage/sidebar/none.svg"
          >
            ADMIN
          </ListItem>
        </NavLink>
      </ul>
      <ul className="nav-link">
        <NavLink
          to="/admin/dashboard"
          exact="true"
          onClick={() => handleItemClick("mainDashboard")}
        >
          <ListItem
            icon="/adminPage/sidebar/dashboard.svg"
            arrow="/adminPage/sidebar/arrow.svg"
          >
            대시 보드
          </ListItem>
        </NavLink>
        <NavLink
          to="/admin/products"
          exact="true"
          onClick={() => handleItemClick("products")}
        >
          <ListItem
            icon="/adminPage/sidebar/products.svg"
            arrow="/adminPage/sidebar/arrow.svg"
          >
            상품 관리
          </ListItem>
        </NavLink>
        <NavLink
          to="/admin/orders"
          exact="true"
          onClick={() => handleItemClick("orders")}
        >
          <ListItem
            icon="/adminPage/sidebar/orders.svg"
            arrow="/adminPage/sidebar/arrow.svg"
          >
            거래 내역 관리
          </ListItem>
        </NavLink>
        <NavLink
          to="/admin/users"
          exact="true"
          onClick={() => handleItemClick("users")}
        >
          <ListItem
            icon="/adminPage/sidebar/users.svg"
            arrow="/adminPage/sidebar/arrow.svg"
          >
            회원관리
          </ListItem>
        </NavLink>
      </ul>
      <ul className="nav-link">
        <NavLink to="/">
          <ListItem
            icon="/adminPage/sidebar/out.svg"
            arrow="/adminPage/sidebar/none.svg"
          >
            나가기
          </ListItem>
        </NavLink>
      </ul>
    </div>
  );
}

export default SideBar;
