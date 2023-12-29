import React, { useEffect, useState } from "react";

import * as S from "../../styles/adminPage/Orders.js";
import Card from "../../shared/adminPage/components/Card";

import DataTable from "../../shared/adminPage/components/DataTable";
import PageNation from "../../shared/PageNation.js";
import PageNationFunc from "../../shared/PageNationFunc.js";
import SelectBoxDelivery from "../../shared/adminPage/components/SelectBoxDelivery.js";
import axios from "axios";

const header = [
  {
    text: "NO.",
    value: "orderId",
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
    value: "address",
  },
  {
    text: "주문 날짜",
    value: "orderDate",
  },
  {
    text: "주문 상태",
    value: "orderStatus",
  },
];

//✅ onChange로 선택 값 바뀌면 그거 가져와서 수정요청 되도록?

function Orders() {
  const [orders, setOrders] = useState([]);
  //---axios get
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/admin/orders");
      console.log("response", response.data);

      const modifiedData = response.data.map((order) => ({
        orderId: order.orderId,
        userName: order.userNumber_user.userName,
        // phoneNumber: , 어딨지
        address: order.address,
        orderDate: order.orderDate,
        orderStatus: order.orderStatus,
      }));
      setOrders(modifiedData);
      console.log(orders);
    } catch (error) {
      console.log("에러", error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //---PageNation
  const { currentPage, oneOfPage, currentItems, handlePageClick } =
    PageNationFunc(orders);

  //---체크 된 값 가져오기
  const [selectedOrderId, setSelectedOrderId] = useState([]);
  const onSelectionChange = (selectedOrderId) => {
    setSelectedOrderId(selectedOrderId);
    console.log("onSelectionChange 호출됨:", selectedOrderId); // 오고있음
  };

  return (
    <>
      <Card>
        <p>✅클릭 시 페이지 이동</p>
        <p>✅출고상태변경 수정요청</p>
        <p>✅출고상태변경 일괄변경.. 위에 </p>
        <p>✅주문상태, 날짜 필터링? </p>
        <h3>거래 내역 관리</h3>
        <DataTable
          keySet="ordersTb_"
          headers={header}
          items={currentItems}
          onSelectionChange={onSelectionChange}
        />
        출고 상태 일괄 변경 :&nbsp; 대기
        {/* <SelectBoxDelivery /> */}
        <PageNation
          total={orders.length}
          limit={oneOfPage}
          page={currentPage}
          setPage={handlePageClick}
        />
      </Card>
    </>
  );
}

export default Orders;
