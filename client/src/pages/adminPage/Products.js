import React from "react";
// import { useState } from "react";

import "../../components/adminPage/Products.css";

import Card from "../../shared/adminPage/components/Card";
import DataTable from "../../shared/adminPage/components/DataTable";

const headers = [
  {
    text: "NO.",
    value: "productID",
  },
  {
    text: "상품명",
    value: "productName",
  },
  {
    text: "카테고리",
    value: "categoryID",
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

const PRODUCTS = [
  {
    productID: 1,
    productName: "flower",
    categoryID: 2,
    productPrice: 17000,
    productStatus: "status",
    productInfo: "hi info",
  },
  {
    productID: 12,
    productName: "flower",
    categoryID: 3,
    productPrice: 17000,
    productStatus: "status",
    productInfo: "hi info",
  },
];
function Products() {
  return (
    <>
      <Card>
        <h3>상품 관리</h3>
        <DataTable headers={headers} PRODUCTS={PRODUCTS} />
      </Card>
    </>
  );
}

export default Products;
