import { useState } from "react";
import * as S from "../../../styles/mainPage/ProductDetails.style";
import Button from "../../../components/register/Button";

function ProductDetail() {
  const [productCount, setProductCount] = useState(0);
  const plusBtn = () => {
    setProductCount(productCount + 1);
  };
  const minusBtn = () => {
    setProductCount(productCount - 1);
  };
  return (
    <>
      <S.ProductLayout>
        <S.ProductTopBox>
          <S.ProductImgBox>
            <img src="/characterBalloon12.jpg" />
          </S.ProductImgBox>
          <S.ProductInfoBox>
            <div>풍선 꽃다발</div>
            <div>
              설명
              주저저리주저맂러ㅣ저맂러저맂러ㅣ절주저저리주저맂러ㅣ저맂러저맂러ㅣ절주저저리주저맂러ㅣ저맂러저맂러ㅣ절주저저리주저맂러ㅣ저맂러저맂러ㅣ절
            </div>
            <div>
              <span>가격 : </span>
              <span>13,000</span>
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
            <Button>구매하기</Button>
            <Button>장바구니</Button>
          </S.ProductInfoBox>
        </S.ProductTopBox>
        {/* 상품 사진 ~ 내용 등 */}
        <S.ProductContentBox>상품 사진 ~ ~ 내용</S.ProductContentBox>
      </S.ProductLayout>
    </>
  );
}
export default ProductDetail;
