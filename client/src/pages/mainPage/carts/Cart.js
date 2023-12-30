import * as S from "../../../styles/mainPage/CartPage";
import CartProduct from "../../../components/mainPage/CartProduct";
import axios from "axios";
import { useEffect } from "react";
import getAccessToken from "../../../hooks/getAcessToken";

function Cart() {
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
        // const res = await axios.get("/api/cart", { params: data }, { headers });
        const res = await axios.get("/api/cart", { params: data, headers });
      } else {
        // 없을 때
        console.log("토큰 업ㅆ따");
        const data = {
          result: false,
        };
        const res = await axios.get("/api/cart", { params: data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartProduct();
  });

  return (
    <>
      <S.CartTitle>장바구니</S.CartTitle>
      <S.CheckBox>
        <input type="checkbox" />
        전체 선택
      </S.CheckBox>
      <div>
        <ul>
          <CartProduct />
          <CartProduct />
          <CartProduct />
        </ul>
      </div>
    </>
  );
}

export default Cart;
