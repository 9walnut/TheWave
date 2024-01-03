import React, { useEffect, useState } from "react";
import { Route, Routes, Link, useNavigate, useParams } from "react-router-dom";

import * as S from "../../styles/adminPage/Orders.js";
import Card from "../../shared/adminPage/components/Card";

import DataTable from "../../shared/adminPage/components/DataTable";
import PageNation from "../../shared/PageNation.js";
import PageNationFunc from "../../shared/PageNationFunc.js";
import SelectBoxDelivery from "../../shared/adminPage/components/SelectBoxDelivery.js";
import axios from "axios";
import OrdersDetail from "./OrdersDetail.js";
import ModifiedPhoneNumber from "../../shared/ModifiedPhoneNumber.js";

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
//✅ selectBox 클릭할 떄 orderId, status 가져와야한다.

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [selectedOrderId, setSelectedOrderId] = useState(null); //*
  const params = useParams(); //*

  const descendingData = (a, b) => {
    return b.orderId - a.orderId;
  };

  //---axios get
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/admin/orders");
      // console.log("orders response", response.data);

      const modifiedData = response.data.map((order) => ({
        orderId: order.orderId,
        userName: order.userNumber_user.userName,
        phoneNumber: (
          <ModifiedPhoneNumber
            phoneNumber={order.userNumber_user.phoneNumber}
          />
        ),
        address: order.address,
        orderDate: order.orderDate,
        orderStatus: order.orderStatus,
      }));

      modifiedData.sort(descendingData);

      setOrders(modifiedData);
      // console.log(orders);
    } catch (error) {
      console.log("에러", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //---PageNation
  const { currentPage, oneOfPage, currentItems, handlePageClick } =
    PageNationFunc(orders);

  //---체크 된 값 가져오기
  const [checkedOrderId, setCheckedOrderId] = useState([]);
  const onSelectionChange = (checkedOrderId) => {
    setCheckedOrderId(checkedOrderId);
    console.log("onSelectionChange 호출됨:", checkedOrderId); // 오고있음
  };

  //---셀렉트 박스 내용 가져오기
  const [selectBoxStatus, setSelectBoxStatus] = useState({});

  const handleStatusChange = (selectBoxStatus) => {
    console.log("Orders 컴포넌트 - selectBoxStatus:", selectBoxStatus);
    const { orderId, outStatus } = selectBoxStatus;
    if (orderId && outStatus) {
      updateData(orderId, outStatus);
    }
  };

  //---axios patch

  const updateData = async (orderId, outStatus) => {
    if (outStatus === "출고") {
      try {
        const response = await axios.patch(`/api/admin/orders/${orderId}`, {
          outStatus,
        });
        console.log("patch응답 성공 (response)", response);
        // console.log("patch응답 성공 (response.data)", response.data);
        fetchData();
        setSelectBoxStatus({});
      } catch (error) {
        console.log("patch에러", error);
      }
    }
  };

  return (
    <>
      <Card>
        <h3>거래 내역 관리</h3>
        <DataTable
          keySet="ordersTb_"
          headers={header}
          items={currentItems}
          onSelectionChange={onSelectionChange}
          onItemClick={(item) => {
            const orderId = item.orderId;
            setSelectedOrderId(orderId); //*
            console.log("클릭한 orderId:", orderId);
            navigate(`/admin/orders/${orderId}`);
          }}
          onStatusChange={handleStatusChange}
        />

        <PageNation
          total={orders.length}
          limit={oneOfPage}
          page={currentPage}
          setPage={handlePageClick}
        />
      </Card>
      <Routes>
        <Route path="/orders/:orderId" element={<OrdersDetail />} />
      </Routes>
    </>
  );
}

export default Orders;
