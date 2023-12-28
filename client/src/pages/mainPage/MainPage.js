import { useState } from "react";
import "./MainPage.css";
import Navbar from "../../components/mainPage/Navbar";
import Carousel from "../../components/mainPage/Carousel";
import ProductCard from "../../components/mainPage/ProductCard";
import Footer from "../../components/mainPage/Footer";
import Slider from "../../components/mainPage/Carousel";

function MainPage() {
  return (
    <>
      <Navbar />
      <section>
        {/* <Carousel /> */}
        <ProductCard />
      </section>
      <Footer />
    </>
  );
}

export default MainPage;
