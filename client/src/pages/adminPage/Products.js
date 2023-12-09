import React from "react";
// import { useState } from "react";

import * as S from "../../styles/adminPage/Products.js";

import Card from "../../shared/adminPage/components/Card";
import DataTable from "../../shared/adminPage/components/DataTable";

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
        <ol>
          <li>
            ✅체크 박스로 상품 선택 가능하도록 구현 (들어갔으면 하는 요소 -
            "전체 선택", "선택 삭제")
          </li>
          <li>✅전체상품 조회 페이지 내 "상품 등록" button 필요</li>
          <li>✅productStatus : "판매중" or "상품준비중" - select 요소로</li>
          <li>✅10개씩 보여주기 페이지네이션</li>
        </ol>
        <DataTable headers={header} items={DUMMY} />
      </Card>
    </>
  );
}

export default Products;
