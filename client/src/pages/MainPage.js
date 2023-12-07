import { useState } from "react";
import "./MainPage.css";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

function MainPage() {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <Navbar toggle={toggle} setToggle={setToggle} />

      <section>
        <Carousel />
        <ProductCard />
      </section>

      <Footer />
    </>
  );
}

export default MainPage;
