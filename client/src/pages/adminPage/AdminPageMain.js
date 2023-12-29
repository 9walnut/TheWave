import React from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import styled from "styled-components";

import MainDashBoard from "./MainDashBoard";
import SideBar from "./SideBar";
import Products from "./Products";
import Orders from "./Orders";
import Users from "./Users";
import ProductsAdd from "./ProductsAdd.js";
import ProductsDetail from "./ProductsDetail.js";

import * as S from "../../styles/adminPage/StyleAdminPageMain.js";

function AdminPageMain() {
  //기본상태 mainDashboard 페이지.
  const [selectedItem, setSelectedItem] = useState("mainDashboard");

  return (
    <S.AdminPageMainLayout>
      <S.LeftBox>
        {/* 클릭된 요소에 따라 아래 페이지 보여줌 */}
        <SideBar selectItem={setSelectedItem} />
      </S.LeftBox>
      <S.RightBox>
        <Routes>
          <Route path="/" element={<MainDashBoard />} />
          <Route path="dashboard" element={<MainDashBoard />} />
          <Route path="products/*" element={<Products />} />
          <Route path="products/add" element={<ProductsAdd />} />
          <Route path="products/:productId" element={<ProductsDetail />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
        </Routes>
      </S.RightBox>
    </S.AdminPageMainLayout>
  );
}

export default AdminPageMain;
