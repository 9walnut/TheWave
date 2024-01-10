import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../MainPage.css";
import * as S from "../../../styles/mainPage/CategoryProducts.style";
import axios from "axios";

function BestProducts() {
  const [products, setProducts] = useState([]);

  const getBestProducts = async () => {
    try {
      const res = await axios.get("/api/category/best");
      console.log("베스트 상품들", res.data);
      setProducts(res.data);
    } catch (error) {
      console.log("베스트 상품 불러오기 에러", error);
    }
  };

  useEffect(() => {
    getBestProducts();
  }, []);

  return (
    <>
      <S.CategoryTitle>Best Products</S.CategoryTitle>
      <S.ProductContentBox>
        {products.map((product) => (
          <S.CardItemBox key={product.productId}>
            <Link to={`/products/${product.productId}`}>
              <div>
                <img src={product.thumbnailUrl} alt={product.productName} />
              </div>
              <div>
                <ul>
                  <li>{product.productName}</li>
                  <li>{product.productInfo}</li>
                  <li>{product.productPrice}원</li>
                </ul>
              </div>
            </Link>
          </S.CardItemBox>
        ))}
      </S.ProductContentBox>
    </>
  );
}

export default BestProducts;
