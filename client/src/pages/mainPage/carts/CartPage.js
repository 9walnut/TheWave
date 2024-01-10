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
  const [receiveName, setReceiveName] = useState();
  const [deliveryRequest, setDeliveryRequest] = useState("");
  const [address, setAddress] = useState();
  const [userAddress, setUserAdderss] = useState();
  const [cartItem, setCartItem] = useState([]);
  const [isPayment, setIsPayment] = useState(false);
  const [deliveryPrice, setDeliveryPrice] = useState(3000);
  const [totalPrice, setTotalPrice] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cartQuantity, setCartQuantity] = useState("");
  const [orderQuantity, SetOrderQuantity] = useState();
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [productInfo, setProductInfo] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const getAddress = (addressData) => {
    const newAddress = `${addressData.selectAddress}/${addressData.postNumber}/${addressData.detailAddress}`;
    setAddress(newAddress);
  };

  const calculateProductTotal = (quantity, price) => quantity * price;

  const calculateTotalPrice = () => {
    return cartItem.reduce((total, item) => {
      return (
        total +
        calculateProductTotal(item.cartQuantity, item.product.productPrice)
      );
    }, 0);
  };

  useEffect(() => {
    if (totalPrice >= 50000) {
      setDeliveryPrice(0);
    } else {
      setDeliveryPrice(3000);
    }
  }, [totalPrice]);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [cartItem]);

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

  // 주문하기 이동(데이터 불러오기)
  const goPayment = async () => {
    console.log("카트아이템", cartItem);
    const cartItems = cartItem.map((item) => ({
      cartId: item.cartId,
      cartQuantity: item.cartQuantity,
      color: item.color,
      size: item.size,
    }));
    try {
      const headers = getAccessToken();
      const res = await axios.post(
        `/api/cart/checkout`,
        { cartItems: cartItems },
        { headers }
      );
      if (res.data.result == false) {
        console.log("주문 실패");
      } else {
        console.log("주문 성공");
        setIsPayment(true);
        console.log("성공데이터", res.data);
        const { carts, productInfo, userAddress, userInfo } = res.data;
        console.log(userAddress);
        setUserAdderss(userAddress);
        setReceiveName(userInfo.userName);
        setPhoneNumber(userInfo.phoneNumber);
        setCartItems(carts);
      }
    } catch (error) {
      console.log("장바구니 결제하기 데이터 불러오기 실패", error);
    }
  };

  // 장바구니 삭제
  const deleteCart = async (cartId) => {
    try {
      const res = await axios.delete("/api/cart", { data: { cartId } });
      if (res.data.result == true) {
        alert("삭제되었습니다");
        getCartProduct();
      } else {
        alert("삭제 실패");
      }
    } catch (error) {
      console.log("장바구니 삭제 에러", error);
    }
  };

  useEffect(() => {
    getCartProduct();
  }, []);

  // 장바구니 결제
  const postPayment = async () => {
    try {
      const data = {
        userAddress: address,
        receiveName: receiveName,
        deliveryRequest: deliveryRequest,
        cartItems: cartItems,
      };
      console.log("결제 시 보내는 데이터입니다.", data);
      const headers = getAccessToken();
      const res = await axios.post(`/api/payment/cart`, data, {
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
        <S.CartListLayout>
          {/* 왼 */}
          <S.CartLeftBox>
            <S.FormBox>
              {!isPayment && <S.CartListTitle>장바구니</S.CartListTitle>}
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
                          {isPayment ? (
                            <div>{product.cartQuantity}개</div>
                          ) : (
                            <S.ProductCountBox>
                              <button
                                onClick={() => {
                                  if (product.cartQuantity > 1) {
                                    updateQuantity(
                                      product.cartId,
                                      product.cartQuantity - 1
                                    );
                                  } else {
                                    alert("최소 구매수량은 1개 입니다.");
                                  }
                                }}
                              >
                                <img src="/assets/minus.svg" />
                              </button>
                              <div>{product.cartQuantity}</div>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    product.cartId,
                                    product.cartQuantity + 1
                                  )
                                }
                              >
                                <img src="/assets/plus.svg" />
                              </button>
                            </S.ProductCountBox>
                          )}
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
                        <S.DeleteProductButton
                          src="/assets/Vector.svg"
                          onClick={() => {
                            deleteCart(product.cartId);
                          }}
                        />
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
                    <S.InputLabel>전화번호</S.InputLabel>
                    <S.Input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="요청사항"
                    />
                  </S.InputWrapper>
                  <S.InputWrapper>
                    <S.InputLabel>배달 시 요청사항</S.InputLabel>
                    <S.Input
                      type="text"
                      value={deliveryRequest}
                      onChange={(e) => setDeliveryRequest(e.target.value)}
                      placeholder="요청사항"
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
                <S.Payment>
                  결제
                  <span>5만원 이상 구매 시 배송비 무료</span>
                </S.Payment>
                <S.PaymentBox>
                  <S.PaymentPriceBox>
                    <div>주문금액</div>
                    <ModifiedPrice number={totalPrice} />원
                  </S.PaymentPriceBox>
                  <S.PaymentPriceBox>
                    <div>배송비</div>
                    <ModifiedPrice number={deliveryPrice} />원
                  </S.PaymentPriceBox>
                  <S.PaymentLine />
                  <S.PaymentPriceBox>
                    <div style={{ fontWeight: "500" }}>총 금액</div>
                    <div>
                      <ModifiedPrice number={totalPrice + deliveryPrice} />원
                    </div>
                  </S.PaymentPriceBox>
                </S.PaymentBox>
                <S.Button onClick={postPayment}>결제하기</S.Button>
              </>
            ) : (
              <>
                <S.Payment>
                  주문
                  <span>5만원 이상 구매 시 배송비 무료</span>
                </S.Payment>
                <S.PaymentBox>
                  <S.PaymentPriceBox>
                    <div>주문금액</div>
                    <div>
                      <ModifiedPrice number={totalPrice} />원
                    </div>
                  </S.PaymentPriceBox>
                  <S.PaymentPriceBox>
                    <div>배송비</div>
                    <ModifiedPrice number={deliveryPrice} />원
                  </S.PaymentPriceBox>
                  <S.PaymentLine />
                  <S.PaymentPriceBox>
                    <div style={{ fontWeight: "500" }}>총 금액</div>
                    <div>
                      <ModifiedPrice number={totalPrice + deliveryPrice} />원
                    </div>
                  </S.PaymentPriceBox>
                </S.PaymentBox>
                <S.Button onClick={goPayment}>주문하기</S.Button>
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
