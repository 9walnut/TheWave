import Footer from "../../../components/mainPage/Footer";
import Navbar from "../../../components/mainPage/Navbar";
import "../MainPage.css";
import CategoryProducts from "./CategoryProducts";

function CategoryPage() {
  <>
    <Navbar />
    <section>
      <CategoryProducts />
    </section>
    <Footer />
  </>;
}
export default CategoryPage;
