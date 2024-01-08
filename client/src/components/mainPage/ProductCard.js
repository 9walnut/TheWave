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

  const addToCart = (productId) => {
    console.log("장바구니 얍");
  };

  const addToWishlist = (productId) => {
    console.log("찜하기 얍");
  };

  return (
    <>
      <S.ProductContentBox>
        {products.slice(0, 10).map((product) => {
          return (
            <S.CardItemBox key={product.productId}>
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
              <div className="buttons-container">
                <button onClick={() => addToCart(product.productId)}>
                  장바구니
                </button>
                <button onClick={() => addToWishlist(product.productId)}>
                  찜하기
                </button>
              </div>
            </S.CardItemBox>
          );
        })}
      </S.ProductContentBox>
    </>
  );
}

export default ProductCard;
