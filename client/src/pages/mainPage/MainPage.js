import { useState } from "react";
import "./MainPage.css";
import Navbar from "../../components/Navbar";
import Carousel from "../../components/Carousel";
import ProductCard from "../../components/ProductCard";
import Footer from "../../components/Footer";

function MainPage() {
  return (
    <>
      <section>
        <Carousel />
        <ProductCard />
      </section>
    </>
  );
}

export default MainPage;
