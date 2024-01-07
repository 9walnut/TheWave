import Footer from "../../../components/mainPage/Footer";
import Navbar from "../../../components/mainPage/Navbar";
import "../MainPage.css";
import BestProducts from "./BestProducts";
function CategoryPage() {
  return (
    <>
      <Navbar />
      <section>
        <BestProducts />
      </section>
      <Footer />
    </>
  );
}
export default CategoryPage;
