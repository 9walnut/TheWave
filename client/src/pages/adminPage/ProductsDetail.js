import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Route, Routes, Link, useNavigate } from "react-router-dom";

import axios from "axios";
import * as S from "../../styles/adminPage/ProductsDetail.js";
import Card from "../../shared/adminPage/components/Card";
import ProductsEdit from "./ProductsEdit.js";
import AdminButtonGrey from "../../components/adminPage/AdminButtonGrey.js";
import AdminButtonBlack from "../../components/adminPage/AdminButtonBlack.js";
import ModifiedPrice from "../../shared/ModifiedPrice.js";
import Swal from "sweetalert2";

function ProductsDetail({ products }) {
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  const navigate = useNavigate();

  //---axios get
  const getProductsDetail = async () => {
    try {
      const response = await axios.get(`/api/admin/products/${productId}`);
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
    try {
      const result = await Swal.fire({
        icon: "question",
        title: "삭제",
        html: "상품을 삭제하시겠습니까?",
        confirmButtonColor: "#5e748f",
        showCancelButton: true,
        confirmButtonText: "예",
        cancelButtonText: "아니오",
      });
      if (result.isConfirmed) {
        const response = await axios.delete(`/api/admin/products/${productId}`);

        if (response.data) {
          console.log("상품 삭제 완료");
          navigate("/admin/products");
          await getProductsDetail();
        } else {
          console.error("상품 삭제 실패");
        }
      }
    } catch (error) {
      console.error("에러", error);
    }
  };

  if (!product || Object.keys(product).length === 0) {
    return <p>상품을 찾을 수 없습니다.</p>;
  }

  return (
    <>
      <S.PageWrapper>
        <Card>
          <S.TitleBox>상품 상세 페이지</S.TitleBox>
          <S.ProductsLayout1>
            <S.Box1>
              <S.SubTitleBox>상품 썸네일 이미지</S.SubTitleBox>
              <img
                src={product.thumbnailUrl}
                alt={product.productName}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </S.Box1>
            <S.Box2>
              <S.SubTitleBox>상품 상세 정보</S.SubTitleBox>
              <S.ItemBox>
                <S.ItemTitle>상품이름</S.ItemTitle>
                <S.ItemContent>{product.productName}</S.ItemContent>
              </S.ItemBox>
              <S.ItemBox>
                <S.ItemTitle>상품 카테고리</S.ItemTitle>
                <S.ItemContent>{product.category.categoryName}</S.ItemContent>
              </S.ItemBox>
              <S.ItemBox>
                <S.ItemTitle>상품 설명</S.ItemTitle>
                <S.ItemContent>
                  {" "}
                  <p style={{ whiteSpace: "pre-line" }}>
                    {product.productInfo}
                  </p>
                </S.ItemContent>
              </S.ItemBox>
              <S.ItemBox>
                <S.ItemTitle>상품 옵션(컬러)</S.ItemTitle>
                <S.ItemContent>{product.productoption.color}</S.ItemContent>
              </S.ItemBox>
              <S.ItemBox>
                <S.ItemTitle>상품 옵션(사이즈)</S.ItemTitle>
                <S.ItemContent>{product.productoption.size}</S.ItemContent>
              </S.ItemBox>
              <S.ItemBox>
                <S.ItemTitle>가격</S.ItemTitle>
                <S.ItemContent>
                  <ModifiedPrice number={product.productPrice} /> 원
                </S.ItemContent>
              </S.ItemBox>
              <S.ItemBox>
                <S.ItemTitle>상태</S.ItemTitle>
                <S.ItemContent>{product.productStatus}</S.ItemContent>
              </S.ItemBox>
            </S.Box2>
            <S.Box3>
              <S.SubTitleWideBox>상품 디테일 이미지</S.SubTitleWideBox>
              {product.detailUrls && product.detailUrls.length > 0 && (
                <>
                  {product.detailUrls.map((url, index) => (
                    <div key={index}>
                      <img
                        src={url}
                        alt={`Detail ${index}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  ))}
                </>
              )}

              <S.ButtonContainer>
                <AdminButtonGrey
                  onClick={() => {
                    navigate(`/admin/products/${productId}/edit`);
                  }}
                >
                  수정
                </AdminButtonGrey>

                <AdminButtonBlack onClick={deleteProduct}>
                  상품 삭제하기
                </AdminButtonBlack>
              </S.ButtonContainer>
            </S.Box3>
          </S.ProductsLayout1>
          <S.ProductsLayout2></S.ProductsLayout2>
        </Card>
      </S.PageWrapper>
      <Routes>
        <Route
          path="/products/:productId/edit"
          element={<ProductsEdit product={product} />}
        />
      </Routes>
    </>
  );
}

export default ProductsDetail;
