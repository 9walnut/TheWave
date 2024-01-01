import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Route, Routes, Link, useNavigate } from "react-router-dom";

import axios from "axios";
import * as S from "../../styles/adminPage/ProductsDetail.js";
import Card from "../../shared/adminPage/components/Card";
import ProductsEdit from "./ProductsEdit.js";
import AdminButtonGrey from "../../components/adminPage/AdminButtonGrey.js";
import AdminButtonBlack from "../../components/adminPage/AdminButtonBlack.js";
function ProductsDetail({ products }) {
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  // console.log("상품 아이디", productId);
  const navigate = useNavigate();

  //---axios get
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
  //---axios delete

  const deleteProduct = async () => {
    if (window.confirm("정말 상품을 삭제하시겠습니까?")) {
      try {
        const response = await axios.delete(`/api/admin/products/${productId}`);
        console.log("response.data: ", response.data);

        if (response.data) {
          console.log("상품 삭제 완료");
          navigate("/admin/products");
          await getProductsDetail();
        } else {
          console.error("상품 삭제 실패");
        }
      } catch (error) {
        console.error("에러", error);
      }
    }
  };

  if (!product || Object.keys(product).length === 0) {
    return <p>상품을 찾을 수 없습니다.</p>;
  }

  return (
    <>
      <Card>
        <h3>상품 상세 페이지</h3>
        <h3>productId : {product.productId}</h3>
        <div>
          이미지자리
          <img src={product.thumbnailUrl} alt={product.productName} />
        </div>
        <p>상품이름: {product.productName}</p>
        <p>상품 카테고리: {product.category.categoryName}</p>
        <p>가격: {product.productPrice}원</p>
        <p>설명: {product.productInfo}</p>
        <p>상태: {product.productStatus}</p>
        <p>상세이미지자리</p>
        <S.ButtonContainer>
          <AdminButtonGrey
            onClick={() => {
              navigate(`/admin/products/edit/${productId}`);
            }}
          >
            수정
          </AdminButtonGrey>

          <AdminButtonBlack onClick={deleteProduct}>삭제</AdminButtonBlack>
        </S.ButtonContainer>
      </Card>
      <Routes>
        <Route
          path="/products/edit/:productId"
          element={<ProductsEdit product={product} />}
        />
      </Routes>
    </>
  );
}

export default ProductsDetail;
