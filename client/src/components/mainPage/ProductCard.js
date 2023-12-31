import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as S from "../../styles/mainPage/ProductCard.style";
import axios from "axios";

function ProductCard() {
  const [products, setProducts] = useState([]);

  const getProduct = async () => {
    try {
      const res = await axios.get("/api");
      console.log(res);
      setProducts(res.data);
    } catch (error) {
      console.log("불러오기 에러");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <S.ProductContentBox>
        {products.slice(0, 8).map((product) => {
          return (
            <S.CardItemBox>
              <Link to={`/products/${product.productId}`}>
                <div>
                  <img src={product.thumbnailUrl} alt="사진" />
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
          );
        })}
      </S.ProductContentBox>
    </>
  );
}

export default ProductCard;
