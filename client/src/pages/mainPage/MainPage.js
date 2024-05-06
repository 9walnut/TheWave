import "./MainPage.css";
import Navbar from "../../components/mainPage/Navbar";
import ProductCard from "../../components/mainPage/ProductCard";
import Footer from "../../components/mainPage/Footer";
import MainCarousel from "../../components/mainPage/Carousel";

function MainPage() {
  return (
    <div
      className="main-container"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {" "}
      <Navbar />
      <section>
        <MainCarousel />
        <ProductCard />
      </section>
      <Footer />
    </div>
  );
}

export default MainPage;
