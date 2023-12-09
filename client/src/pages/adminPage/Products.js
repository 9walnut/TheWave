import React from "react";
import { Link } from "react-router-dom";
// import { useState } from "react";

import * as S from "../../styles/adminPage/Products.js";

import Card from "../../shared/adminPage/components/Card";
import DataTable from "../../shared/adminPage/components/DataTable";
import AdminButtonBlack from "../../components/adminPage/AdminButtonBlack.js";
import AdminButtonGrey from "../../components/adminPage/AdminButtonGrey.js";

const header = [
  {
    text: "NO.",
    value: "productID",
  },
  {
    text: "상품명",
    value: "productName",
  },
  // {
  //   text: "카테고리아이디",
  //   value: "categoryID",
  // },
  {
    text: "카테고리",
    value: "categoryName",
  },
  {
    text: "가격",
    value: "productPrice",
  },
  {
    text: "상태",
    value: "productStatus",
  },
  {
    text: "정보",
    value: "productInfo",
  },
];

const DUMMY = [
  {
    productID: 1,
    productName: "루돌프풍선",
    // categoryID: 2,
    categoryName: "커스텀풍선",
    productPrice: 17000,
    productStatus: "판매중",
    productInfo: "이렇다",
  },
  {
    productID: 2,
    productName: "곰돌이풍선",
    // categoryID: 3,
    categoryName: "용돈풍선",
    productPrice: 17000,
    productStatus: "재고없음",
    productInfo: "저렇다",
  },
];
function Products() {
  return (
    <>
      <Card>
        <h3>상품 관리</h3>
        <DataTable headers={header} items={DUMMY} />
        <S.ButtonContainer>
          <AdminButtonGrey>선택 상품 삭제하기</AdminButtonGrey>
          <AdminButtonBlack>상품 등록하기</AdminButtonBlack>
        </S.ButtonContainer>
      </Card>
    </>
  );
}

export default Products;
