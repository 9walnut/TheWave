// ProductsAdd.js 파일
import React from "react";
import { useState } from "react";
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

function ProductsAdd() {
  const textAreaStyle = {
    width: "590px",
    height: "300px",
  };
  const [productName, setProductName] = useState("");
  const [productInfo, setProductInfo] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [productStatus, setProductStatus] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [detailUrls, setDetailUrls] = useState(null);

  console.log("dddd", productStatus);

  const getImageDataThumbnail = (thumbnailUrl) => {
    setThumbnailUrl(thumbnailUrl);
    console.log("썸네일왔니", thumbnailUrl); //왔다!
  };
  const getImageDataDetail = (detailUrls) => {
    setDetailUrls(detailUrls);
    console.log("디테일왔니", detailUrls); //왔다!
  };
  const sendData = async () => {
    try {
      // const productName = productName;
      // const productInfo = productInfo;
      // const productPrice = productPrice;
      // const categoryId = categoryId;
      // const productStatus = productStatus;

      const data = {
        productName,
        productInfo,
        productPrice,
        categoryName,
        productStatus,
        thumbnailUrl,
        detailUrls,
      };
      console.log("ㅎㅎㅎㅎ", detailUrls);

      const response = await axios.post("/admin/products/add", data);
      console.log("전송 성공", response.data.result);
      if (response.data.result) {
        console.log("되었다");
      } else {
        console.log("안보내짐");
      }
    } catch (error) {
      console.log("에러", error.response.data);
    }
  };

  return (
    <>
      <Card>
        <h3>Products Add Page</h3>
        <hr />

        <h3>상품 정보</h3>
        <AdminInput
          type="text"
          placeholder="특수문자 허용, 최소 4글자 이상"
          value={productName}
          onChange={setProductName}
        >
          상품명
        </AdminInput>
        <AdminInput
          type="text"
          placeholder="상품 관련 상세 설명을 입력해주세요."
          style={textAreaStyle}
          value={productInfo}
          onChange={setProductInfo}
        >
          상품 상세 설명
        </AdminInput>
        <AdminInput
          type="number"
          placeholder="숫자만 입력 가능"
          value={productPrice}
          onChange={setProductPrice}
        >
          가격
        </AdminInput>

        <AdminSelect title="상품 카테고리">
          <SelectBoxCategory value={categoryName} onChange={setCategoryName} />
        </AdminSelect>

        <AdminSelect title="상품 상태">
          <SelectBoxProduct value={productStatus} onChange={setProductStatus} />
        </AdminSelect>

        <hr />
        <h3>이미지 정보</h3>
        <h3>thumbnailUpload</h3>
        <UploadThumbnail onFileChange={getImageDataThumbnail} />
        <h3>detailUpload</h3>
        <UploadDetail onFileChange={getImageDataDetail} />
        <hr />
        <AdminButtonBlack onClick={sendData}>상품 등록하기</AdminButtonBlack>
      </Card>
    </>
  );
}

export default ProductsAdd;
