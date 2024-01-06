import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as S from "../../../styles/mainPage/ProductDetails.style";
import axios from "axios";
import SeperatedPrice from "../../../hooks/SeparatedPrice";
import getAccessToken from "../../../hooks/getAcessToken";

function ProductDetail() {
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);
  const { productId } = useParams();
  const [categoryName, setCategoryName] = useState();
  const [value, displayValue, setValue] = SeperatedPrice(0);
  const [orderQuantity, SetOrderQuantity] = useState(0);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);

  const handleSize = (e) => {
    setSize(e.target.value);
  };

  const handleColor = (e) => {
    setColor(e.target.value);
  };
  console.log("상품 아이디", productId);

  // 상품 불러오기
  const getProductDetail = async () => {
    try {
      const res = await axios.get(`/api/product/${productId}`);
      console.log(res.data);
      setProduct(res.data.productDetail);
      setCategoryName(res.data.categoryName.categoryName);
      setColor(res.data.productOption.color);
      setSize(res.data.productOption.size);
    } catch (error) {
      console.log("상품 불러오기 에러", error);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  const plusBtn = () => {
    SetOrderQuantity(orderQuantity + 1);
    setValue(value + product.productPrice);
  };

  const minusBtn = () => {
    SetOrderQuantity(orderQuantity - 1);
    setValue(value - product.productPrice);
  };

  // 장바구니
  const cartIn = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
      const data = { cartQuantity: orderQuantity };
      const res = await axios.post(`/api/product/${productId}`, data, {
        headers,
      });

      // 비회원일 때
      if (res.data.result === "guest") {
        const inCart = JSON.parse(localStorage.getItem("cart")) || []; // 장바구니 데이터 불러오기
        console.log("inCart", inCart);

        // 장바구니에 이미 동일한 상품이 담겨 있는지 확인, 있으면 해당 데이터 인덱스 반환
        const inCartId = inCart.findIndex(
          (item) => item.productId === `${productId}`
        );

        // 동일한 상품이 존재할 경우
        if (inCartId !== -1) {
          inCart[inCartId].cartQuantity += orderQuantity;
        } else {
          const newCartIn = {
            productId: `${productId}`,
            cartQuantity: orderQuantity,
          };
          inCart.push(newCartIn); // 동일 상품 없으면 데이터 저장
        }
        localStorage.setItem("cart", JSON.stringify(inCart));
        localStorage.getItem("cart");
      } else {
        // 회원일 때
        console.log("회원 장바구니 담기 완료", res.data.cart);
      }
    } catch (error) {
      console.log("장바구니 담기 에러", error);
    }
  };

  // 구매하기
  const goPayment = async () => {
    try {
      // 넘길 데이터는
      const headers = getAccessToken();
      const res = await axios.post(
        `/api/payment/orderList/${productId}`,
        { orderQuantity, color, size },
        {
          headers,
        }
      );
      if (!res.data.result) {
        console.log("결제완", res.data);
        navigate(`/payment/orderList/${productId}`, { state: res.data });
      }
    } catch (error) {
      console.log("결제에러", error);
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
            {/* 셀렉트박스 */}
            <div className="productName">{product.productName}</div>
            <div>{product.productInfo}</div>
            <div>
              <span>가격 : </span>
              <span>{product.productPrice}</span>
            </div>
            <div>
              <select onChange={handleColor} value={color}>
                {color.map((color) => {
                  return (
                    <option value={color} key={color}>
                      {color}
                    </option>
                  );
                })}
              </select>
              {/*  */}
              <select onChange={handleSize} value={size}>
                {size.map((size) => {
                  return (
                    <option value={size} key={size}>
                      {size}
                    </option>
                  );
                })}
              </select>
            </div>
            <S.ProductCountBox>
              <button onClick={minusBtn}>
                <img src="/assets/minus.svg" />
              </button>
              <div>{orderQuantity}</div>
              <button onClick={plusBtn}>
                <img src="/assets/plus.svg" />
              </button>
            </S.ProductCountBox>
            <div>
              <span>결제 금액: </span>
              <span>{displayValue}</span>
            </div>
            <button onClick={goPayment}>구매하기</button>
            {/* <Button>구매하기</Button> */}
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
