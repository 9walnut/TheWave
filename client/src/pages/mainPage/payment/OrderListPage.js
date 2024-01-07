import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router";
import Navbar from "../../../components/mainPage/Navbar";
import * as S from "../../../styles/mainPage/OrderList.style";
import Footer from "../../../components/mainPage/Footer";
import getAccessToken from "../../../hooks/getAcessToken";
import axios from "axios";

function OrderListPage() {
  const { state } = useLocation();
  const { productId } = useParams();
  const { size, color, productInfo, userAddress, userInfo } = state;
  const [orderQuantity, SetOrderQuantity] = useState(state.orderQuantity);
  const [receiveName, setReceiveName] = useState(userInfo.userName);
  const [deliveryRequest, setDeliveryRequest] = useState("");
  const totalPrice = productInfo.productPrice * orderQuantity;
  const navigate = useNavigate();

  const postPayment = async () => {
    try {
      const data = {
        orderQuantity,
        color,
        size,
        address: userAddress.address,
        receiveName: receiveName,
        deliveryRequest: deliveryRequest,
      };
      const headers = getAccessToken();
      const res = await axios.post(`/api/payment/${productId}`, data, {
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
            <S.OrderListTitle>주문 정보 확인</S.OrderListTitle>

            <S.OrderBox>주문 상품</S.OrderBox>
            <div>
              <S.Productbox>
                <S.ImgBox>
                  <img src={state.productInfo.thumbnailUrl} />
                </S.ImgBox>
                <div>{size}</div>
                <div>{color}</div>
              </S.Productbox>
            </div>

            <input
              type="text"
              value={receiveName}
              onChange={(e) => setReceiveName(e.target.value)}
            />
            <input
              type="text"
              value={deliveryRequest}
              onChange={(e) => setDeliveryRequest(e.target.value)}
            />
          </S.OrderLeftBox>
          {/* 오른쪽 */}
          <S.OrderRightBox>
            <div>주문 정보 확인</div>
            <div>Total</div>
            <div>{totalPrice}</div>
            <button onClick={postPayment}>결제하기</button>
          </S.OrderRightBox>
        </S.OrderListLayout>
      </section>
      <Footer />
    </>
  );
}

export default OrderListPage;
