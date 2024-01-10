import Footer from "../../../components/mainPage/Footer";
import Navbar from "../../../components/mainPage/Navbar";
import * as S from "../../../styles/mainPage/ProductDetails.style";

import ".././MainPage.css";
import ProductDetail from "./ProductDetail.js";

function ProductDetailsPage() {
  return (
    <>
      <Navbar />
      <section>
        <S.ProductLayout>
          <ProductDetail />
        </S.ProductLayout>
      </section>
      <Footer />
    </>
  );
}

export default ProductDetailsPage;
