import Footer from "../../components/mainPage/Footer";
import Navbar from "../../components/mainPage/Navbar";
import * as S from "../../styles/mainPage/ProductDetails";
import styled from "styled-components";
import "./MainPage.css";
import ProductDetail from "./products/ProductDetail";

const ProductLayout = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 1400px;
  width: 100%;
  margin-top: 100px;
`;

const ProductSection = styled.div`
  /* padding: 20px; */
  width: 60%;
  height: 100%;
  border-right: 1px solid black;
`;

const ProductRightBox = styled.div``;

function ProductDetailsPage() {
  return (
    <>
      <Navbar />
      <ProductLayout>
        {/* 상품 */}
        <ProductSection>
          <ProductDetail />
        </ProductSection>

        {/* 구매하기 장바구니 */}
        <div></div>
      </ProductLayout>
      <Footer />
    </>
  );
}

export default ProductDetailsPage;
