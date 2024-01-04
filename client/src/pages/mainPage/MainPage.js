import { useState } from "react";
import "./MainPage.css";
import Navbar from "../../components/mainPage/Navbar";
import ProductCard from "../../components/mainPage/ProductCard";
import Footer from "../../components/mainPage/Footer";
import MainCarousel from "../../components/mainPage/Carousel";

function MainPage() {
  return (
    <>
      <Navbar />
      <section>
        <MainCarousel />
        <ProductCard />
      </section>
      <Footer />
    </>
  );
}

export default MainPage;
