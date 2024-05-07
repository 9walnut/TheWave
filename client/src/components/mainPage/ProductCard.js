import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as S from "../../styles/mainPage/ProductCard.style";
import axios from "axios";
import getAccessToken from "../../hooks/getAcessToken";
import ModifiedPrice from "../../shared/ModifiedPrice";
import Swal from "sweetalert2";

function ProductCard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const getProduct = async () => {
    try {
      const res = await axios.get("/api");
      setProducts(res.data);
    } catch (error) {
      console.log("불러오기 에러");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const addToWishlist = async (productId) => {
    const headers = getAccessToken();
    if (headers == false) {
      Swal.fire({
        icon: "error",
        title: "회원만 찜하기가 가능합니다.",
      });
    } else {
      const res = await axios.get(`/api/product/wish/${productId}`, {
        headers,
      });
      if (res.data.result == true) {
        Swal.fire({
          icon: "success",
          title: "찜하기 완료",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "이미 존재하는 상품입니다",
        });
      }
    }
  };

  return (
    <>
      <S.ProductContentBox>
        {products.slice(0, 40).map((product) => {
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
                    <li>
                      <ModifiedPrice number={product.productPrice} />원
                    </li>
                  </ul>
                </div>
              </Link>
              <div className="buttons-container">
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
