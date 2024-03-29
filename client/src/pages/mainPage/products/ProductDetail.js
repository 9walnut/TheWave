import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as S from "../../../styles/mainPage/ProductDetails.style";
import axios from "axios";
import SeperatedPrice from "../../../hooks/SeparatedPrice";
import getAccessToken from "../../../hooks/getAcessToken";
import ModifiedPrice from "../../../shared/ModifiedPrice";
import Swal from "sweetalert2";

function ProductDetail() {
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);
  const { productId } = useParams();
  const [categoryName, setCategoryName] = useState();
  const [value, displayValue, setValue] = SeperatedPrice(0);
  const [orderQuantity, SetOrderQuantity] = useState(1);
  const [sizeList, setSizeList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [size, setSize] = useState();
  const [color, setColor] = useState();

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
      setColorList(res.data.colors);
      setSizeList(res.data.size);
    } catch (error) {
      console.log("상품 불러오기 에러", error);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  useEffect(() => {
    setSize(sizeList[0]);
    setColor(colorList[0]);
  }, [sizeList, colorList]);

  const plusBtn = () => {
    SetOrderQuantity(orderQuantity + 1);
  };

  const minusBtn = () => {
    if (orderQuantity > 1) {
      SetOrderQuantity(orderQuantity - 1);
    } else {
      Swal.fire({
        icon: "warning",
        title: "최소 구매 수량은 1개입니다",
        confirmButtonColor: "#5a5a5a",
        width: "60%",
      });
    }
  };

  // 장바구니
  const cartIn = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
      const data = { cartQuantity: orderQuantity, color: color, size: size };
      const res = await axios.post(`/api/product/${productId}`, data, {
        headers,
      });
      if (res.data.result == true) {
        Swal.fire({
          icon: "success",
          title: "장바구니에 담겼습니다.",
          html: "바로 확인하시겠습니까?",
          confirmButtonColor: "#5a5a5a",
          showCancelButton: true,
          confirmButtonText: "예",
          cancelButtonText: "아니오",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/cart");
          } else {
          }
        });
      }

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
      if (!res.data.result == true) {
        console.log("정상작동", res.data);
        navigate(`/payment/orderList/${productId}`, { state: res.data });
      } else {
        console.log("삐빅실패");
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
              <span className="miniProductName">{product.productName}</span>
            </div>
            {/* 셀렉트박스 */}

            <div className="productName">{product.productName}</div>

            <S.InfoProductBox>
              <div>{product.productInfo}</div>
              <div>
                <span>가격: </span>
                {product.productPrice && (
                  <ModifiedPrice number={product.productPrice} />
                )}
              </div>
            </S.InfoProductBox>
            <S.SelectBox>
              <S.Select onChange={handleColor} value={color}>
                {colorList.map((color) => {
                  return (
                    <option value={color} key={color}>
                      {color}
                    </option>
                  );
                })}
              </S.Select>
              <S.Select onChange={handleSize} value={size}>
                {sizeList.map((size) => {
                  return (
                    <option value={size} key={size}>
                      {size}
                    </option>
                  );
                })}
              </S.Select>
            </S.SelectBox>
            <S.CenterBox>
              <S.ProductCountBox>
                <button onClick={minusBtn}>
                  <img src="/assets/minus.svg" />
                </button>
                <div>{orderQuantity}</div>
                <button onClick={plusBtn}>
                  <img src="/assets/plus.svg" />
                </button>
              </S.ProductCountBox>
            </S.CenterBox>
            <S.PaymentBox>
              <span>결제 금액: </span>
              <ModifiedPrice number={orderQuantity * product.productPrice} />
            </S.PaymentBox>
            <S.InfoButtonBox>
              <S.InfoButton onClick={goPayment}>구매하기</S.InfoButton>
              <S.InfoButton onClick={cartIn}>장바구니</S.InfoButton>
            </S.InfoButtonBox>
          </S.ProductInfoBox>
        </S.ProductTopBox>
        {/* 상품 사진 ~ 내용 등 */}
        <S.ProductContentBox>
          {product.detailUrls && product.detailUrls.length > 0 && (
            <>
              {product.detailUrls.map((url, index) => (
                <div key={index}>
                  <img
                    src={url}
                    alt={`Detail ${index}`}
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </div>
              ))}
            </>
          )}
        </S.ProductContentBox>
      </S.ProductLayout>
    </>
  );
}
export default ProductDetail;
