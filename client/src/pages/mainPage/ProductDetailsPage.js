import Footer from "../../components/mainPage/Footer";
import Navbar from "../../components/mainPage/Navbar";
import * as S from "../../styles/mainPage/ProductDetails.style.js";
import styled from "styled-components";
import "./MainPage.css";
import ProductDetail from "./products/ProductDetail";

function ProductDetailsPage() {
  return (
    <>
      <Navbar />
      <S.ProductLayout>
        <ProductDetail />
      </S.ProductLayout>
      <Footer />
    </>
  );
}

export default ProductDetailsPage;
