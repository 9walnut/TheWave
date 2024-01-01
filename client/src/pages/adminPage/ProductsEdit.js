// ProductsAdd.js 파일
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import AdminInput from "../../shared/adminPage/components/AdminInput";
import AdminInputText from "../../shared/adminPage/components/AdminInputText";
import Card from "../../shared/adminPage/components/Card";

import AdminButtonBlack from "../../components/adminPage/AdminButtonBlack";

import SelectBoxProduct from "../../shared/adminPage/components/SelectBoxProduct";
import SelectBoxCategory from "../../shared/adminPage/components/SelectBoxCategory";
import AdminSelect from "../../shared/adminPage/components/AdminSelect";
import axios from "axios";
import UploadThumbnail from "../../shared/adminPage/components/UploadThumbnail";
import UploadDetail from "../../shared/adminPage/components/UploadDetail";

function ProductsEdit() {
  const { productId } = useParams();

  const textAreaStyle = {
    width: "590px",
    height: "300px",
  };
  const [newProductName, setNewProductName] = useState("");
  const [newProductInfo, setNewProductInfo] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newProductStatus, setNewProductStatus] = useState("");
  const [newThumbnailUrl, setNewThumbnailUrl] = useState("");
  const [newDetailUrls, setNewDetailUrls] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`/api/admin/products/${productId}`);
        const productData = response.data;
        console.log(productData);

        setNewProductName(productData.productName);
        setNewProductInfo(productData.productInfo);
        setNewProductPrice(productData.productPrice);
        setNewCategoryName(productData.category.categoryName);
        setNewProductStatus(productData.productStatus);
        setNewThumbnailUrl(productData.thumbnailUrl);
        setNewDetailUrls(productData.detailUrls);

        console.log(newDetailUrls);
      } catch (error) {
        console.error("상품 정보를 가져오는 중 에러 발생", error);
      }
    };

    fetchProductData();
  }, [productId]);

  const getImageDataThumbnail = (thumbnailUrl) => {
    setNewThumbnailUrl(thumbnailUrl);
    console.log("썸네일왔니", thumbnailUrl); //왔다!
  };
  const getImageDataDetail = (detailUrls) => {
    setNewDetailUrls(detailUrls);
    console.log("디테일왔니", detailUrls); //왔다!
  };
  // const sendData = async () => {
  //   try {

  //     const data = {
  //       productName,
  //       productInfo,
  //       productPrice,
  //       categoryName,
  //       productStatus,
  //       thumbnailUrl,
  //       detailUrls,
  //     };
  //     console.log("ㅎㅎㅎㅎ", detailUrls);

  //     const response = await axios.post("/api/admin/products/add", data);
  //     console.log("전송 성공", response.data.result);
  //     if (response.data.result) {
  //       console.log("되었다");
  //     } else {
  //       console.log("안보내짐");
  //     }
  //   } catch (error) {
  //     console.log("에러", error);
  //   }
  // };

  return (
    <>
      <Card>
        <h3>Products Edit Page</h3>
        <hr />
        <h3>상품 정보</h3>
        <AdminInput
          type="text"
          placeholder="특수문자 허용, 최소 4글자 이상"
          value={newProductName}
          onChange={setNewProductName}
        >
          상품명
        </AdminInput>
        <AdminInput
          type="text"
          placeholder="상품 관련 상세 설명을 입력해주세요."
          style={textAreaStyle}
          value={newProductInfo}
          onChange={setNewProductInfo}
        >
          상품 상세 설명
        </AdminInput>
        <AdminInput
          type="number"
          placeholder="숫자만 입력 가능"
          value={newProductPrice}
          onChange={setNewProductPrice}
        >
          가격
        </AdminInput>

        <AdminSelect title="상품 카테고리">
          <SelectBoxCategory
            value={newCategoryName}
            onChange={setNewCategoryName}
          />
        </AdminSelect>

        <AdminSelect title="상품 상태">
          <SelectBoxProduct
            value={newProductStatus}
            onChange={setNewProductStatus}
          />
        </AdminSelect>

        <hr />
        <h3>이미지 정보</h3>
        <h3>✅이미지 수정 요청 해야함</h3>
        <h3>thumbnailUpload</h3>
        <p>✅선택된 썸네일 이미지</p>
        <img
          src={newThumbnailUrl}
          alt="thumbnail"
          style={{ width: "100px", height: "100px" }}
        />
        <UploadThumbnail onFileChange={getImageDataThumbnail} />
        <h3>detailUpload</h3>
        <p>✅선택된 디테일 이미지</p>
        {newDetailUrls &&
          JSON.parse(newDetailUrls).map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`detail-${index}`}
              style={{ width: "100px", height: "100px" }}
            />
          ))}
        <UploadDetail onFileChange={getImageDataDetail} />
        <hr />
        {/* <AdminButtonBlack onClick={sendData}>상품 수정하기</AdminButtonBlack> */}
      </Card>
    </>
  );
}

export default ProductsEdit;
