import React, { useState } from "react";

import * as S from "../../styles/adminPage/Orders.js";

import Card from "../../shared/adminPage/components/Card";
import DataTable from "../../shared/adminPage/components/DataTable";
import AdminButtonGrey from "../../components/adminPage/AdminButtonGrey.js";

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
    orderDetailNumber: 1,
    userName: "루돌프",
    phoneNumber: "01048589333",
    addressID: 333,
    totalPrice: 12000,
    deliveryStatus: "",
  },
];

function Orders() {
  const [selectDeliveryStatus, setSelectDeliveryStatus] = useState("");

  const addSelectBox = () => {};

  return (
    <>
      <Card>
        <h3>거래 내역 관리</h3>
        <ol>
          <li>
            ✅체크박스로 상품 선택 가능하도록. 선택된 요소들 배송상태 변경 기능
            필요 ("전체 선택", "배송중", "배송완료", "거래 취소")
          </li>
          <li>
            ✅전체 주문 목록 페이지 내 "배송중", "배송완료", "거래 취소" button
            필요(ex "상품준비중" 을 "배송중" or "배송완료"){" "}
          </li>
          <li>✅주문 목록 10개씩 보여주기, 이전 페이지, 다음페이지 구현</li>
        </ol>
        <DataTable keySet="ordersTb_" headers={header} items={DUMMY} />
        출고 상태 일괄 변경 :&nbsp;
        <SelectBox />
      </Card>
    </>
  );
}

export default Orders;
