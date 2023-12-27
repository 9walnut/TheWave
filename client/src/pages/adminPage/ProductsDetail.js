import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as S from "../../styles/adminPage/ProductsDetail.js";
import Card from "../../shared/adminPage/components/Card";

function ProductsDetail() {
  const productId = useParams();
  console.log("찍히나나나", productId);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/products/${productId}`);
        // const response = await axios.get("/products/3");
        console.log("response", response.data);
        // const modifiedData = response.data.find(
        //   (product) => product.productId == productId
        // );
        // setProductData(modifiedData);
      } catch (error) {
        console.error("제품 데이터를 불러오는 중 오류 발생", error);
      }
    };

    fetchData();
  }, [productId]);

  if (!productData) {
    return <p>상품을 찾을 수 없습니다.</p>;
  }

  const {
    productName,
    productPrice,
    productInfo,
    productStatus,
    thumbnailUrl,
    detailUrls,
  } = productData;

  return (
    <>
      <Card>
        <h3>상품 상세 페이지</h3>
        <img src={thumbnailUrl} alt={productName} />
        <p>{productName}</p>
        <p>가격: {productPrice}원</p>
        <p>설명: {productInfo}</p>
        <p>상태: {productStatus}</p>
        {detailUrls && detailUrls.length > 0 && (
          <div>
            <h4>상세 이미지들:</h4>
            {detailUrls.map((url, index) => (
              <img key={index} src={url} alt={`Detail ${index + 1}`} />
            ))}
          </div>
        )}
      </Card>
    </>
  );
}

export default ProductsDetail;
