import Footer from "../../../components/mainPage/Footer";
import Navbar from "../../../components/mainPage/Navbar";
import * as S from "../../../styles/mainPage/ProductDetails.style";
import styled from "styled-components";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ".././MainPage.css";
import ProductDetail from "./ProductDetail.js";

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
