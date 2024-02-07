import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import * as S from "../../styles/adminPage/OrdersDetail.js";
import Card from "../../shared/adminPage/components/Card";
import ModifiedPhoneNumber from "../../shared/ModifiedPhoneNumber.js";
import AdminButtonGrey from "../../components/adminPage/AdminButtonGrey.js";
import AdminButtonBlack from "../../components/adminPage/AdminButtonBlack.js";

function OrdersDetail({ orders }) {
  const [order, setOrder] = useState({});
  const { orderId } = useParams();
  //console.log("OrdersDetail Params 아이디", orderId);

  const getOrdersDetail = async () => {
    try {
      const response = await axios.get(`/api/admin/orders/${orderId}`);
      //console.log("응답오나", response.data);
      setOrder(response.data);
    } catch (error) {
      console.error("상품 불러오기 에러", error);
    }
  };

  useEffect(() => {
    getOrdersDetail();
  }, [orderId]);

  //✅ 데이터테이블에 있는것만 보여주면됨.

  //orderStatus switch
  const getOrderStatus = (status) => {
    switch (status) {
      case 1:
        return "주문";
      case 2:
        return "교환";
      case 3:
        return "환불";
      case 4:
        return "취소";
      default:
        return "알 수 없음";
    }
  };

  return (
    <>
      <Card>
        {order.product && order.userNumber_user && (
          <>
            <S.TitleBox>거래 내역 상세 페이지</S.TitleBox>
            {/* <div>orderId: {order.orderId}</div> */}
            <S.OrdersDetailLayout1>
              <S.Box1>
                <S.SubTitleBox>주문 상품 정보</S.SubTitleBox>
              </S.Box1>
              <S.Box2>
                <S.ItemBox>
                  <S.ItemTitle>주문 상품명</S.ItemTitle>
                  <S.ItemContent>{order.product.productName}</S.ItemContent>
                </S.ItemBox>
                <S.ItemBox>
                  <S.ItemTitle>주문 수량</S.ItemTitle>
                  <S.ItemContent>{order.orderQuantity}</S.ItemContent>
                </S.ItemBox>
                <S.ItemBox>
                  <S.ItemTitle>색상</S.ItemTitle>
                  <S.ItemContent>{order.color}</S.ItemContent>
                </S.ItemBox>
                <S.ItemBox>
                  <S.ItemTitle>사이즈</S.ItemTitle>
                  <S.ItemContent>{order.size}</S.ItemContent>
                </S.ItemBox>
              </S.Box2>
            </S.OrdersDetailLayout1>

            <S.OrdersDetailLayout1>
              <S.Box1>
                <S.SubTitleBox>배송 정보</S.SubTitleBox>
              </S.Box1>
              <S.Box2>
                <S.ItemBox>
                  <S.ItemTitle>수령자 성함</S.ItemTitle>
                  <S.ItemContent>
                    {order.userNumber_user.userName}
                  </S.ItemContent>
                </S.ItemBox>

                <S.ItemBox>
                  {order.userNumber_user.phoneNumber && (
                    <>
                      <S.ItemTitle>수령자 연락처</S.ItemTitle>
                      <S.ItemContent>
                        {" "}
                        <ModifiedPhoneNumber
                          phoneNumber={order.userNumber_user.phoneNumber}
                        />
                      </S.ItemContent>
                    </>
                  )}
                </S.ItemBox>

                <S.ItemBox>
                  <S.ItemTitle>주소</S.ItemTitle>
                  <S.ItemContent>
                    {order.userNumber_user.addresses[0].address}
                  </S.ItemContent>
                </S.ItemBox>
                <S.ItemBox>
                  <S.ItemTitle>배송 요청사항</S.ItemTitle>
                  <S.ItemContent>{order.deliveryRequest}</S.ItemContent>
                </S.ItemBox>
              </S.Box2>
            </S.OrdersDetailLayout1>

            <S.OrdersDetailLayout1>
              <S.Box1>
                {" "}
                <S.SubTitleBox>거래 정보</S.SubTitleBox>
              </S.Box1>
              <S.Box2>
                <S.ItemBox>
                  <S.ItemTitle>주문 날짜</S.ItemTitle>
                  <S.ItemContent>{order.orderDate}</S.ItemContent>
                </S.ItemBox>
                <S.ItemBox>
                  <S.ItemTitle>배송 상태</S.ItemTitle>
                  <S.ItemContent>
                    {getOrderStatus(order.orderStatus)}
                  </S.ItemContent>
                </S.ItemBox>
                <S.ItemBox>
                  <S.ItemTitle>출고 변경 날짜</S.ItemTitle>
                  <S.ItemContent>{order.changeDate}</S.ItemContent>
                </S.ItemBox>
              </S.Box2>
            </S.OrdersDetailLayout1>
          </>
        )}
        <S.BtnWrapper>
          <AdminButtonGrey>거래 취소</AdminButtonGrey>
          <AdminButtonBlack>거래 확정</AdminButtonBlack>
        </S.BtnWrapper>
      </Card>
    </>
  );
}

export default OrdersDetail;
