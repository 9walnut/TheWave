import { useState } from "react";
import "./MainPage.css";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

function MainPage() {
  return (
    <>
      <Navbar />

      <section>
        <Carousel />
        <ProductCard />
      </section>

      <Footer />
    </>
  );
}

export default MainPage;
