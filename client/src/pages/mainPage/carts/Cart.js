import * as S from "../../../styles/mainPage/CartPage.style";
import CartProduct from "../../../components/mainPage/CartProduct";
import axios from "axios";
import { useEffect, useState } from "react";
import getAccessToken from "../../../hooks/getAcessToken";

function Cart() {
  const [cartItem, setCartItem] = useState([]);
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

  useEffect(() => {
    getCartProduct();
  }, []);

  return (
    <>
      <S.CartTitle>장바구니</S.CartTitle>
      <S.CheckBox>
        <input type="checkbox" />
        전체 선택
      </S.CheckBox>
      <div>
        <ul>
          {cartItem.map((product) => {
            return <CartProduct key={product.cartId} product={product} />;
          })}
        </ul>
      </div>
    </>
  );
}

export default Cart;
