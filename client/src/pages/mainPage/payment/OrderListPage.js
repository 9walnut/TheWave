import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router";
import Navbar from "../../../components/mainPage/Navbar";
import * as S from "../../../styles/mainPage/OrderList.style";
import Footer from "../../../components/mainPage/Footer";
import getAccessToken from "../../../hooks/getAcessToken";
import axios from "axios";
import AddressComponent from "../../../components/register/AddressComponent";
import SeperatedPrice from "../../../hooks/SeparatedPrice";

function OrderListPage() {
  const { state } = useLocation();
  const { productId } = useParams();
  const { size, color, productInfo, userAddress, userInfo } = state;
  const [orderQuantity, SetOrderQuantity] = useState(state.orderQuantity);
  const [receiveName, setReceiveName] = useState(userInfo.userName);
  const [deliveryRequest, setDeliveryRequest] = useState("");
  const [address, setAddress] = useState(userAddress);
  const [value, displayValue, setValue] = SeperatedPrice(0);
  const curPrice = productInfo.productPrice * orderQuantity;
  const totalPrice = curPrice + 3000;
  const navigate = useNavigate();
  console.log("가져온 정보입니다.", state);

  const getAddress = (addressData) => {
    const newAddress = `${addressData.selectAddress}/${addressData.postNumber}/${addressData.detailAddress}`;
    setAddress(newAddress);
  };

  const plusBtn = () => {
    SetOrderQuantity(orderQuantity + 1);
    setValue(value + productInfo.productPrice);
  };

  const minusBtn = () => {
    SetOrderQuantity(orderQuantity - 1);
    setValue(value - productInfo.productPrice);
  };

  const postPayment = async () => {
    try {
      const data = {
        userAddress: address,
        receiveName: receiveName,
        deliveryRequest: deliveryRequest,
        productInfo: [productInfo],
        orderQuantity,
        color,
        size,
      };
      console.log("결제 시 보내는 데이터입니다.", data);
      const headers = getAccessToken();
      const res = await axios.post(`/api/payment`, data, {
        headers,
      });
      alert("결제완료~");
      navigate("/");
    } catch (error) {
      console.log("ㅋㅋ실패요", error);
    }
  };
  return (
    <>
      <Navbar />
      <section>
        <S.OrderListLayout>
          {/* 왼쪽 */}
          <S.OrderLeftBox>
            <S.FormBox>
              <S.OrderListTitle>주문 정보 확인</S.OrderListTitle>

              <S.OrderBox>주문 상품</S.OrderBox>
              <S.Productbox>
                <S.ImgBox>
                  <img src={state.productInfo.thumbnailUrl} />
                </S.ImgBox>
                <S.ProductNameBox>
                  <div style={{ fontSize: "small" }}>상품명</div>
                  {productInfo.productName}
                </S.ProductNameBox>
                <S.InfoBox>
                  <div>
                    옵션: {size} / {color}
                  </div>
                  <S.ProductCountBox>
                    <button onClick={minusBtn}>
                      <img src="/assets/minus.svg" />
                    </button>
                    <div>{orderQuantity}</div>
                    <button onClick={plusBtn}>
                      <img src="/assets/plus.svg" />
                    </button>
                  </S.ProductCountBox>
                </S.InfoBox>
              </S.Productbox>

              <S.InputWrapper>
                <S.InputLabel>이름</S.InputLabel>
                <S.Input
                  type="text"
                  value={receiveName}
                  onChange={(e) => setReceiveName(e.target.value)}
                />
              </S.InputWrapper>
              <S.InputWrapper>
                <S.InputLabel>배달 시 요청사항</S.InputLabel>
                <S.Input
                  type="text"
                  value={deliveryRequest}
                  onChange={(e) => setDeliveryRequest(e.target.value)}
                />
              </S.InputWrapper>
              <S.InputWrapper>
                <S.InputLabel>주소</S.InputLabel>
                <AddressComponent
                  getAddress={getAddress}
                  userAddress={userAddress}
                />
              </S.InputWrapper>
            </S.FormBox>
          </S.OrderLeftBox>
          {/* 오른쪽 */}
          <S.OrderRightBox>
            <S.Payment>결제</S.Payment>
            <S.PaymentBox>
              <S.PaymentPriceBox>
                <div>주문금액</div>
                <div>{curPrice}원</div>
              </S.PaymentPriceBox>
              <S.PaymentPriceBox>
                <div>배송비</div>
                <div>3,000원</div>
              </S.PaymentPriceBox>
              <S.PaymentLine />
              <S.PaymentPriceBox>
                <div style={{ fontWeight: "500" }}>총 금액</div>
                <div>{totalPrice}원</div>
              </S.PaymentPriceBox>
            </S.PaymentBox>
            <S.Button onClick={postPayment}>결제하기</S.Button>
          </S.OrderRightBox>
        </S.OrderListLayout>
      </section>
      <Footer />
    </>
  );
}

export default OrderListPage;
