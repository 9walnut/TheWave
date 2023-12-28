import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as S from "../../styles/adminPage/ProductsDetail.js";
import Card from "../../shared/adminPage/components/Card";

function ProductsDetail({ products }) {
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  // console.log("상품 아이디", productId);

  const getProductsDetail = async () => {
    try {
      const response = await axios.get(`/api/admin/products/${productId}`);
      console.log("응답오나", response.data);
      setProduct(response.data);
    } catch (error) {
      console.error("상품 불러오기 에러", error);
    }
  };

  useEffect(() => {
    getProductsDetail();
  }, [productId]);

  if (!product || Object.keys(product).length === 0) {
    return <p>상품을 찾을 수 없습니다.</p>;
  }

  return (
    <>
      <Card>
        <h3>상품 상세 페이지</h3>
        <div>
          이미지자리
          <img src={product.thumbnailUrl} alt={product.productName} />
        </div>
        <p>상품이름: {product.productName}</p>
        <p>가격: {product.productPrice}원</p>
        <p>설명: {product.productInfo}</p>
        <p>상태: {product.productStatus}</p>
        <p>상세이미지자리</p>
      </Card>
    </>
  );
}

export default ProductsDetail;
