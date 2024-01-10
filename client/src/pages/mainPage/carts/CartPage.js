import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router";
import Navbar from "../../../components/mainPage/Navbar";
import * as S from "../../../styles/mainPage/CartPage.style";
import Footer from "../../../components/mainPage/Footer";
import getAccessToken from "../../../hooks/getAcessToken";
import axios from "axios";
import AddressComponent from "../../../components/register/AddressComponent";
import SeperatedPrice from "../../../hooks/SeparatedPrice";
import ModifiedPrice from "../../../shared/ModifiedPrice";

function CartPage() {
  // const [orderQuantity, SetOrderQuantity] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [receiveName, setReceiveName] = useState();
  const [deliveryRequest, setDeliveryRequest] = useState("");
  const [address, setAddress] = useState();
  const [userAddress, setUserAdderss] = useState();
  const [cartItem, setCartItem] = useState([]);
  const [isPayment, setIsPayment] = useState(false);
  const [orderQuantity, SetOrderQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [cartQuantity, setCartQuantity] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const getAddress = (addressData) => {
    const newAddress = `${addressData.selectAddress}/${addressData.postNumber}/${addressData.detailAddress}`;
    setAddress(newAddress);
  };

  const plusBtn = () => {
    // SetOrderQuantity(orderQuantity + 1);
    // setValue(value + productInfo.productPrice);
  };

  const minusBtn = () => {
    // SetOrderQuantity(orderQuantity - 1);
    // setValue(value - productInfo.productPrice);
  };

  const calculateProductTotal = (quantity, price) => quantity * price;

  const calculateTotalPrice = () => {
    return cartItem.reduce((total, item) => {
      return total + calculateProductTotal(item.quantity, item.price);
    }, 0);
  };

  // 상품 수량 업데이트 함수
  const updateQuantity = (itemId, newQuantity) => {
    const updatedCartItems = cartItem.map((item) =>
      item.cartId === itemId ? { ...item, cartQuantity: newQuantity } : item
    );
    setCartItem(updatedCartItems);
  };

  const getCartProduct = async () => {
    try {
      const headers = getAccessToken();
      console.log("headers값임!!!", headers);
      if (headers) {
        // 토큰 값이 있을 때
        console.log("토큰 있따");
        const data = {
          result: true,
        };
        const res = await axios.get("/api/cart", { params: data, headers });
        console.log("장바구니에는 이렇다", res.data);
        setCartItem(res.data);
      } else {
        // 없을 때
        console.log("토큰 업따");
        const data = {
          result: false,
        };

        const res = await axios.get("/api/cart", { params: data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 결제하기 이동(데이터 불러오기)
  const goPayment = async () => {
    try {
      const headers = getAccessToken();
      const res = await axios.post(
        `/api/cart/checkout`,
        { cartQuantity, color, size },
        { headers }
      );
      if (res.data.result == false) {
        console.log("주문 실패");
      } else {
      }
    } catch (error) {
      console.log("장바구니 결제하기 데이터 불러오기 실패", error);
    }
  };

  // 장바구니 삭제
  const deleteCart = async (cartId) => {
    try {
      const res = await axios.delete("/api/cart", { data: cartId });
      if (res.data.result == true) {
        alert("삭제되었습니다.");
      } else {
        alert("삭제실패");
      }
    } catch (error) {
      console.log("장바구니 삭제 에러", error);
    }
  };

  useEffect(() => {
    getCartProduct();
  }, []);

  return (
    <>
      <Navbar />
      <section>
        <S.CartListLayout>
          {/* 왼 */}
          <S.CartLeftBox>
            <S.FormBox>
              <S.CartListTitle>장바구니</S.CartListTitle>
              <S.CartBox>주문 상품</S.CartBox>
              {cartItem &&
                cartItem.map((product, i) => {
                  return (
                    <>
                      <S.Productbox key={product.cartId}>
                        <S.ImgBox>
                          <img src={product.product.thumbnailUrl} />
                        </S.ImgBox>
                        <S.ProductNameBox>
                          <div style={{ fontSize: "small" }}>상품명</div>
                          {product.product.productName}
                        </S.ProductNameBox>
                        <S.InfoBox>
                          <div>
                            옵션: {product.size} / {product.color}
                          </div>
                          <S.ProductCountBox>
                            <input
                              type="number"
                              value={product.cartQuantity}
                              onChange={(e) =>
                                updateQuantity(
                                  product.cartId,
                                  parseInt(e.target.value)
                                )
                              }
                            />
                            {/* <button>
                              <img src="/assets/minus.svg" />
                            </button>
                            <div>{product.cartQuantity}</div>
                            <button onClick={plusBtn}>
                              <img src="/assets/plus.svg" />
                            </button>  */}
                          </S.ProductCountBox>
                          <div>
                            <ModifiedPrice
                              number={
                                product.cartQuantity *
                                product.product.productPrice
                              }
                            />
                            원
                          </div>
                        </S.InfoBox>
                        <div
                          onClick={() => {
                            deleteCart(product.cartId);
                          }}
                        >
                          X
                        </div>
                      </S.Productbox>
                    </>
                  );
                })}

              {isPayment && (
                <>
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
                </>
              )}
            </S.FormBox>
          </S.CartLeftBox>
          {/* 오 */}
          <S.CartRightBox>
            {isPayment ? (
              <>
                <S.Payment>결제</S.Payment>
                <S.PaymentBox>
                  <S.PaymentPriceBox>
                    <div>주문금액</div>
                    <div>
                      <ModifiedPrice number={totalPrice} />원
                    </div>
                  </S.PaymentPriceBox>
                  <S.PaymentPriceBox>
                    <div>배송비</div>
                    <div>3,000원</div>
                  </S.PaymentPriceBox>
                  <S.PaymentLine />
                  <S.PaymentPriceBox>
                    <div style={{ fontWeight: "500" }}>총 금액</div>
                    <div>
                      <ModifiedPrice number={totalPrice + 3000} />원
                    </div>
                  </S.PaymentPriceBox>
                </S.PaymentBox>
                <S.Button>결제하기</S.Button>
              </>
            ) : (
              <>
                <S.Payment>주문</S.Payment>
                <S.PaymentBox>
                  <S.PaymentPriceBox>
                    <div>주문금액</div>
                    <div>
                      <ModifiedPrice number={totalPrice} />원
                    </div>
                  </S.PaymentPriceBox>
                  <S.PaymentPriceBox>
                    <div>배송비</div>
                    <div>3,000원</div>
                  </S.PaymentPriceBox>
                  <S.PaymentLine />
                  <S.PaymentPriceBox>
                    <div style={{ fontWeight: "500" }}>총 금액</div>
                    <div>
                      <ModifiedPrice number={totalPrice + 3000} />원
                    </div>
                  </S.PaymentPriceBox>
                </S.PaymentBox>
                <S.Button>주문하기</S.Button>
              </>
            )}
          </S.CartRightBox>
        </S.CartListLayout>
      </section>
      <Footer />
    </>
  );
}

export default CartPage;
