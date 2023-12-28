import { useParams } from "react-router";
import Navbar from "../../../components/mainPage/Navbar";
import Footer from "../../../components/mainPage/Footer";
import "../MainPage.css";
import { useEffect, useState } from "react";
import * as S from "../../../styles/mainPage/CategoryProducts.style";
import axios from "axios";

function CategoryProducts() {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  console.log("카테고리 아이디", categoryId);

  const getCategoryProduct = async () => {
    try {
      const res = await axios.get(`api/category/${categoryId}`);
      console.log("카테고리 상품", res.data);
      setProducts(res.data);
    } catch (error) {
      console.log("카테고리 불러오기 에러", error);
    }
  };

  useEffect(() => {
    getCategoryProduct();
  }, []);

  return <></>;
}

export default CategoryProducts;
