import Footer from "../../../components/mainPage/Footer";
import Navbar from "../../../components/mainPage/Navbar";
import "../MainPage.css";
import CategoryProducts from "./CategoryProducts";

function CategoryPage() {
  return (
    <div
      className="main-container"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {" "}
      <Navbar />
      <section className="category content">
        <CategoryProducts />
      </section>
      <Footer />
    </div>
  );
}
export default CategoryPage;
