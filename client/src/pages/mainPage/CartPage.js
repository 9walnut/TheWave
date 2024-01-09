import Footer from "../../components/mainPage/Footer";
import Navbar from "../../components/mainPage/Navbar";
import styled from "styled-components";
import "./MainPage.css";
import ProductDetail from "./products/ProductDetail";
import Cart from "./carts/Cart";
import Button from "../../components/register/Button";

const CartLayout = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  margin-top: 100px;
  margin-bottom: 100px;
  padding: 20px;
  /* color: #5a5a5a; */
`;

const CartLeftBox = styled.div`
  height: 100%;
  width: 60%;
  padding: 2em;
  border-right: 1px solid #ddd;
`;

const CartRightBox = styled.div`
  height: 100%;
  width: 40%;
  padding: 2em;
`;

function CartPage() {
  return (
    <>
      <Navbar />
      <section>
        <CartLayout>
          <CartLeftBox>
            {/* 장바구니 */}
            {/* <S.CartTitle></S.CartTitle> */}
            <Cart />
          </CartLeftBox>
          <CartRightBox>
            {/* 주문 정보 확인 */}
            {/* 결제 */}
            <div>총합:</div>
            <Button>주문하기</Button>
          </CartRightBox>
        </CartLayout>
      </section>
      <Footer />
    </>
  );
}

export default CartPage;
