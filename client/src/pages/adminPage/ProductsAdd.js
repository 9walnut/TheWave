import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import * as S from "../../styles/adminPage/ProductsAdd.js";

import Card from "../../shared/adminPage/components/Card";
import AdminButtonBlack from "../../components/adminPage/AdminButtonBlack";

import AdminInput from "../../shared/adminPage/components/AdminInput";
import AdminTextarea from "../../shared/adminPage/components/AdminTextarea.js";
import SelectBoxProduct from "../../shared/adminPage/components/SelectBoxProduct";
import SelectBoxCategory from "../../shared/adminPage/components/SelectBoxCategory";
import SelectBoxOptionSize from "../../shared/adminPage/components/SelectBoxOptionSize";
import AdminSelect from "../../shared/adminPage/components/AdminSelect";
import UploadThumbnail from "../../shared/adminPage/components/UploadThumbnail";
import UploadDetail from "../../shared/adminPage/components/UploadDetail";
import AdminOptionSize from "../../shared/adminPage/components/AdminOptionSize.js";

function ProductsAdd() {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [productInfo, setProductInfo] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [productStatus, setProductStatus] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [detailUrls, setDetailUrls] = useState(null);

  const [alertProductName, setAlertProductName] = useState("");
  const [alertProductPrice, setAlertProductPrice] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const [alertTextarea, setAlertTextarea] = useState("");

  const [test, setTest] = useState("");

  //------------------------ 유효성 검사
  useEffect(() => {
    validateProductName();
    validateProductPrice();
    validateTextarea();
  }, [productName, productPrice, productInfo]);

  useEffect(() => {
    setTimeout(() => {
      validateColor();
    }, 300);
  }, [color]);

  const validateProductName = () => {
    if (productName.length <= 3) {
      setAlertProductName("최소 4글자 이상 입력해주세요. 특수문자 허용 😀");
    } else {
      setAlertProductName("");
    }
  };

  const validateProductPrice = () => {
    if (isNaN(productPrice) || productPrice <= 0) {
      setAlertProductPrice("숫자만 입력 가능합니다. 😀");
    } else {
      setAlertProductPrice("");
    }
  };

  const validateColor = () => {
    if (
      color.includes(",,") ||
      color.startsWith(",") ||
      color.endsWith(",") ||
      color.includes(" ") ||
      color.trim() === "" ||
      color.includes(",,") ||
      color.includes(",,")
    ) {
      setAlertColor("공백이나 연속된 콤마, 시작과 끝에 콤마가 있습니다. 😀");
    } else {
      setAlertColor("");
    }
  };

  const validateTextarea = () => {
    if (productInfo.trim() === "") {
      setAlertTextarea("상품 상세 설명란이 비어있습니다.😀");
    } else {
      setAlertTextarea("");
    }
  };

  //------------------------ 이미지 업로드
  const getImageDataThumbnail = (thumbnailUrl) => {
    setThumbnailUrl(thumbnailUrl);
    // console.log("썸네일왔니", thumbnailUrl);
  };
  const getImageDataDetail = (detailUrls) => {
    setDetailUrls(detailUrls);
    // console.log("디테일왔니", detailUrls);
  };

  //------------------------ 데이터 전송
  const sendData = async () => {
    try {
      const data = {
        productName,
        productInfo,
        productPrice,
        categoryName,
        productStatus,
        thumbnailUrl,
        detailUrls,
        color,
        size,
      };
      // console.log("ㅎㅎㅎㅎ", detailUrls);

      const response = await axios.post("/api/admin/products/add", data);
      console.log("전송 성공response 데이터", response);
      console.log("response 데이터 생성된 productId", response.data.productId);

      const productId = response.data.productId;
      if (response.data) {
        navigate(`/admin/products/${productId}`);
        // console.log("되었다");
      } else {
        // console.log("안보내짐");
      }
    } catch (error) {
      alert("입력란과 옵션 선택, 이미지를 모두 등록해주세요.");
      console.log("에러", error);
    }
  };

  // useEffect(() => {
  //   console.log(size);
  // }, [size]);

  return (
    <>
      <Card>
        <S.TitleBox>상품 등록하기</S.TitleBox>
        <S.SubTitleBox>상품 정보</S.SubTitleBox>
        <S.ProductsLayout1>
          <S.Box1>
            {" "}
            <AdminInput
              type="text"
              placeholder="상품명을 입력해주세요."
              value={productName}
              onChange={setProductName}
              required
              minlength="4"
              onFocus={validateProductName}
            >
              상품명 <S.AlertMsgBox>{alertProductName}</S.AlertMsgBox>
            </AdminInput>
            <AdminTextarea
              type="text"
              placeholder="상품 관련 상세 설명을 입력해주세요."
              value={productInfo}
              onChange={setProductInfo}
              onFocus={validateTextarea}
            >
              상품 상세 설명<S.AlertMsgBox>{alertTextarea}</S.AlertMsgBox>
            </AdminTextarea>
          </S.Box1>
          <S.Box2>
            <AdminInput
              type="number"
              placeholder="상품 가격을 입력해주세요."
              value={productPrice}
              onChange={setProductPrice}
              required
              onFocus={validateProductPrice}
            >
              가격<S.AlertMsgBox>{alertProductPrice}</S.AlertMsgBox>
            </AdminInput>

            <AdminSelect title="상품 카테고리">
              <SelectBoxCategory
                value={categoryName}
                onChange={setCategoryName}
              />
            </AdminSelect>

            <AdminSelect title="상품 상태">
              <SelectBoxProduct
                value={productStatus}
                onChange={setProductStatus}
              />
            </AdminSelect>
            {/* 실패-------------------- */}
            {/* <AdminSelect title="상품 옵션 - 사이즈">
              <AdminOptionSize value={size} onChange={setSize} />
            </AdminSelect>        */}
            {/* 실패-------------------- */}
            <AdminSelect title="상품 옵션 - 사이즈">
              <SelectBoxOptionSize value={size} onChange={setSize} />
            </AdminSelect>
            <AdminInput
              type="text"
              placeholder="상품컬러는 , 로 구분해주세요."
              value={color}
              onChange={setColor}
              onFocus={validateColor}
            >
              상품 옵션 - 컬러 <S.AlertMsgBox>{alertColor}</S.AlertMsgBox>
            </AdminInput>
          </S.Box2>
        </S.ProductsLayout1>
        <S.SubTitleBox>이미지 정보</S.SubTitleBox>
        <S.ProductsLayout2>
          <S.Box3>
            <S.SubjectBox>썸네일 등록</S.SubjectBox>

            <UploadThumbnail onFileChange={getImageDataThumbnail} />
          </S.Box3>
          <S.Box4>
            <S.SubjectBox>상세 이미지 등록</S.SubjectBox>

            <UploadDetail onFileChange={getImageDataDetail} />
          </S.Box4>
        </S.ProductsLayout2>
        <br />
        <hr />
        <S.SendDataBtnWrapper>
          <AdminButtonBlack onClick={sendData}>상품 등록하기</AdminButtonBlack>
        </S.SendDataBtnWrapper>
      </Card>
    </>
  );
}

export default ProductsAdd;
