import * as S from "../../../styles/mainPage/CartPage";
import CartProduct from "../../../components/mainPage/CartProduct";

function Cart() {
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
