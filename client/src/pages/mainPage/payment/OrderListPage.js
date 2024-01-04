import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router";
import Navbar from "../../../components/mainPage/Navbar";
import * as S from "../../../styles/mainPage/OrderList.style";
import Footer from "../../../components/mainPage/Footer";
import getAccessToken from "../../../hooks/getAcessToken";
import axios from "axios";

function OrderListPage() {
  //   const { state } = useLocation();
  //   console.log("받아온 데이터입니다.", state);
  //   const { productId } = useParams();
  //   const [size, setSize] = useState(state.size);
  //   const [color, setColor] = useState(state.color);
  //   const [orderQuantity, SetOrderQuantity] = useState(state.orderQuantity);
  //   const [userName, setUserName] = useState("");
  //   const [receiveName, setReceiveName] = useState("");
  //   const [deliveryRequest, setDeliveryRequest] = useState("");

  //   const payment = async () => {
  //     try {
  //       const headers = getAccessToken();
  //       const res = await axios.post(
  //         `/api/payment/${productId}`,
  //         {},
  //         { headers }
  //       );
  //     } catch (error) {
  //       console.log("ㅋㅋ실패요", error);
  //     }
  //   };
  return (
    <>
      <Navbar />
      <section>
        <S.OrderListLayout>
          {/* 왼쪽 */}
          <S.OrderLeftBox>
            <S.OrderListTitle>주문 정보 확인</S.OrderListTitle>

            <S.OrderBox>주문 상품</S.OrderBox>
            <li>
              <S.Productbox>
                <S.ImgBox>
                  {/* <img src={state.productInfo.thumbnailUrl} /> */}
                </S.ImgBox>
                {/* <div>{}</div> */}
              </S.Productbox>
            </li>
          </S.OrderLeftBox>
          {/* 오른쪽 */}
          <S.OrderRightBox>
            <div>주문 정보 확인</div>
          </S.OrderRightBox>
        </S.OrderListLayout>
      </section>
      <Footer />
    </>
  );
}

export default OrderListPage;
