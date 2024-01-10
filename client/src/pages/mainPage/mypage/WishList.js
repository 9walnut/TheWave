import { useEffect, useState } from "react";
import getAccessToken from "../../../hooks/getAcessToken";
import * as S from "../../../styles/mainPage/wishList.style";
import axios from "axios";
import { Link } from "react-router-dom";

function WishList() {
  const [products, setProducts] = useState([]);
  const getWishList = async () => {
    try {
      const headers = getAccessToken();
      const res = await axios.get("/api/mypage/wishList", { headers });

      console.log("마이페이지 위시리스트", res.data);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWishList();
  }, []);

  const removeWishList = async (productId) => {
    try {
      const headers = getAccessToken();
      const res = await axios.delete("/api/mypage/wishList", {
        data: { productId: productId },
        headers,
      });
      if (res.data.result == true) {
        getWishList();
      }
    } catch (error) {
      console.log("위시리스트 delelte error", error);
    }
  };

  // 불가능
  const addToCart = async (productId) => {
    try {
      const headers = getAccessToken();
      const res = await axios.post(
        "/api/mypage/wishList",
        {
          data: { productId: productId },
        },
        { headers }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h3>위시리스트</h3>
      <S.ProductContentBox>
        {products.map((product) => {
          return (
            <S.CardItemBox key={product.productId}>
              <Link to={`/products/${product.productId}`}>
                <div>
                  <img src={product.product.thumbnailUrl} alt="사진" />
                </div>
                <div>
                  <ul>
                    <li>{product.product.productName}</li>
                    <li>{product.product.productPrice}원</li>
                  </ul>
                </div>
              </Link>
              <div className="buttons-container">
                <button onClick={() => removeWishList(product.productId)}>
                  삭제
                </button>
                {/* <button onClick={() => addToCart(product.productId)}>
                  장바구니
                </button> */}
              </div>
            </S.CardItemBox>
          );
        })}
      </S.ProductContentBox>
    </>
  );
}

export default WishList;
