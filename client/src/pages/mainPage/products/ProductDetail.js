import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as S from "../../../styles/mainPage/ProductDetails.style";
import Button from "../../../components/register/Button";
import axios from "axios";
import SeperatedPrice from "../../../hooks/SeparatedPrice";

function ProductDetail() {
  const [product, setProduct] = useState([]);
  const { productId } = useParams();
  const [categoryName, setCategoryName] = useState();
  console.log("상품 아이디", productId);

  const getProductDetail = async () => {
    try {
      const res = await axios.get(`/api/product/${productId}`);
      console.log(res.data);
      setProduct(res.data.productDetail);
      setCategoryName(res.data.categoryName.categoryName);
    } catch (error) {
      console.log("상품 불러오기 에러", error);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  const [value, displayValue, setValue] = SeperatedPrice(0);
  const [productCount, setProductCount] = useState(0);

  const plusBtn = () => {
    setProductCount(productCount + 1);
    setValue(value + product.productPrice);
  };

  const minusBtn = () => {
    setProductCount(productCount - 1);
    setValue(value - product.productPrice);
  };

  // 장바구니
  const cartIn = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
      const data = { cartQuantity: productCount };
      const res = await axios.post(`/api/product/${productId}`, data, {
        headers,
      });

      // 비회원일 때
      if (res.data.result === "guest") {
        const guestCart = {
          productId: `${productId}`,
          cartQuantity: productCount,
        };
        let guestCartArr = JSON.parse(localStorage.getItem("cart")) || [];
        guestCartArr.push(guestCart);
        localStorage.setItem("cart", JSON.stringify(guestCartArr)); // 로컬스토리지에 비회원 장바구니 담은 목록 저장

        localStorage.getItem("cart");
      } else {
        // 회원일 때
        console.log("장바구니 담음", res.data.cart);
      }
    } catch (error) {
      console.log("장바구니 담기 에러", error);
    }
  };
  return (
    <>
      <S.ProductLayout>
        <S.ProductTopBox>
          <S.ProductImgBox>
            <img src={product.thumbnailUrl} />
          </S.ProductImgBox>
          <S.ProductInfoBox>
            <div className="categoryInfo">
              <Link to={`/category/${product.categoryId}`}>
                <a>{categoryName} / </a>
              </Link>
              <span className="miniProductName"> {product.productName}</span>
            </div>
            <div className="productName">{product.productName}</div>
            <div>{product.productInfo}</div>
            <div>
              <span>가격 : </span>
              <span>{product.productPrice}</span>
            </div>
            <S.ProductCountBox>
              <button onClick={minusBtn}>
                <img src="/assets/minus.svg" />
              </button>
              <div>{productCount}</div>
              <button onClick={plusBtn}>
                <img src="/assets/plus.svg" />
              </button>
            </S.ProductCountBox>
            <div>
              <span>결제 금액: </span>
              <span>{displayValue}</span>
            </div>
            <Button>구매하기</Button>
            {/* <Button>장바구니</Button> */}
            <button onClick={cartIn}>장바구니</button>
          </S.ProductInfoBox>
        </S.ProductTopBox>
        {/* 상품 사진 ~ 내용 등 */}
        <S.ProductContentBox>{product.productInfo}</S.ProductContentBox>
      </S.ProductLayout>
    </>
  );
}
export default ProductDetail;
