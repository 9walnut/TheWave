import React, { useState } from "react";

import * as S from "../../styles/adminPage/Orders.js";
import Card from "../../shared/adminPage/components/Card";

import DataTable from "../../shared/adminPage/components/DataTable";
import PageNation from "../../shared/PageNation.js";
import PageNationFunc from "../../shared/PageNationFunc.js";
import SelectBox from "../../shared/adminPage/components/SelectBox.js";

const header = [
  {
    text: "NO.",
    value: "orderDetailNumber",
  },
  {
    text: "주문자 (고객명)",
    value: "userName",
  },
  {
    text: "핸드폰 번호",
    value: "phoneNumber",
  },
  {
    text: "주소",
    value: "addressID",
  },
  {
    text: "결제 금액",
    value: "totalPrice",
  },
  {
    text: "배송 상태",
    value: "deliveryStatus",
  },
];

const DUMMY = [
  {
    orderDetailNumber: 1,
    userName: "루돌프",
    phoneNumber: "01048589333",
    addressID: 333,
    totalPrice: 12000,
    deliveryStatus: "",
  },
  {
    orderDetailNumber: 2,
    userName: "루돌프",
    phoneNumber: "01048589333",
    addressID: 333,
    totalPrice: 12000,
    deliveryStatus: "",
  },
  {
    orderDetailNumber: 3,
    userName: "루돌프",
    phoneNumber: "01048589333",
    addressID: 333,
    totalPrice: 12000,
    deliveryStatus: "",
  },
  {
    orderDetailNumber: 4,
    userName: "루돌프",
    phoneNumber: "01048589333",
    addressID: 333,
    totalPrice: 12000,
    deliveryStatus: "",
  },
  {
    orderDetailNumber: 5,
    userName: "루돌프",
    phoneNumber: "01048589333",
    addressID: 333,
    totalPrice: 12000,
    deliveryStatus: "",
  },
  {
    orderDetailNumber: 6,
    userName: "루돌프",
    phoneNumber: "01048589333",
    addressID: 333,
    totalPrice: 12000,
    deliveryStatus: "",
  },
  {
    orderDetailNumber: 7,
    userName: "루돌프",
    phoneNumber: "01048589333",
    addressID: 333,
    totalPrice: 12000,
    deliveryStatus: "",
  },
  {
    orderDetailNumber: 8,
    userName: "루돌프",
    phoneNumber: "01048589333",
    addressID: 333,
    totalPrice: 12000,
    deliveryStatus: "",
  },
  {
    orderDetailNumber: 9,
    userName: "루돌프",
    phoneNumber: "01048589333",
    addressID: 333,
    totalPrice: 12000,
    deliveryStatus: "",
  },
  {
    orderDetailNumber: 10,
    userName: "루돌프",
    phoneNumber: "01048589333",
    addressID: 333,
    totalPrice: 12000,
    deliveryStatus: "",
  },
  {
    orderDetailNumber: 11,
    userName: "루돌프",
    phoneNumber: "01048589333",
    addressID: 333,
    totalPrice: 12000,
    deliveryStatus: "",
  },
  {
    orderDetailNumber: 12,
    userName: "루돌프",
    phoneNumber: "01048589333",
    addressID: 333,
    totalPrice: 12000,
    deliveryStatus: "",
  },
];

function Orders() {
  const { currentPage, oneOfPage, currentItems, handlePageClick } =
    PageNationFunc(DUMMY);

  return (
    <>
      <Card>
        <h3>거래 내역 관리</h3>
        <DataTable keySet="ordersTb_" headers={header} items={currentItems} />
        출고 상태 일괄 변경 :&nbsp;
        <SelectBox />
        <PageNation
          total={DUMMY.length}
          limit={oneOfPage}
          page={currentPage}
          setPage={handlePageClick}
        />
      </Card>
    </>
  );
}

export default Orders;
