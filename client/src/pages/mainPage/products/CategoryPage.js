import Footer from "../../../components/mainPage/Footer";
import Navbar from "../../../components/mainPage/Navbar";
import "../MainPage.css";
import CategoryProducts from "./CategoryProducts";

function CategoryPage() {
  console.log("하이하이 니ㅏ는 카테고리 페이지");

  return (
    <>
      <Navbar />
      <section className="category">
        <CategoryProducts />
      </section>
      <Footer />
    </>
  );
}
export default CategoryPage;
