import { useState } from "react";
import "./MainPage.css";
import Navbar from "../../components/mainPage/Navbar";
import CarouselComponent from "../../components/mainPage/Carousel";
import ProductCard from "../../components/mainPage/ProductCard";
import Footer from "../../components/mainPage/Footer";

function MainPage() {
  return (
    <>
      <Navbar />
      <section>
        {/* <CarouselComponent /> */}
        <ProductCard />
      </section>
      <Footer />
    </>
  );
}

export default MainPage;
