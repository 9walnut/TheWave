import Footer from "../../components/mainPage/Footer";
import Navbar from "../../components/mainPage/Navbar";
import * as S from "../../styles/mainPage/ProductDetails";
import styled from "styled-components";
import "./MainPage.css";
import ProductDetail from "./products/ProductDetail";
import Cart from "./carts/Cart";

const CartLayout = styled.div`
  display: flex;
  height: 1400px;
  width: 100%;
  margin-top: 100px;
  margin-bottom: 100px;
  padding: 40px;
`;

const CartLeftBox = styled.div`
  height: 100%;
  width: 60%;
  border-right: 1px solid black;
`;

const CartRightBox = styled.div`
  height: 100%;
  width: 40%;
`;

function CartPage() {
  return (
    <>
      <Navbar />
      <section>
        <CartLayout>
          <CartLeftBox>
            <Cart />
          </CartLeftBox>
          <CartRightBox></CartRightBox>
          {/* 장바구니 */}
          {/* 주문 정보 확인 */}
          {/* 결제 */}
        </CartLayout>
      </section>
      <Footer />
    </>
  );
}

export default CartPage;
