import { useParams } from "react-router";
import Navbar from "../../../components/mainPage/Navbar";
import Footer from "../../../components/mainPage/Footer";
import "../MainPage.css";
import { useEffect, useState } from "react";
import * as S from "../../../styles/mainPage/CategoryProducts.style";
import axios from "axios";
function CategoryProducts() {
  const [products, setProducts] = useState([]);
  const { categortId } = useParams();

  console.log("카테고리 아이디", categortId);

  useEffect(() => {
    const getCategoryProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/category/${categortId}`
        );
        console.log("카테고리 상품", res.data);
        setProducts(res.data);
      } catch (error) {
        console.log("카테고리 불러오기 에러", error);
      }
    };

    getCategoryProduct();
  }, []);

  return <></>;
}

export default CategoryProducts;
