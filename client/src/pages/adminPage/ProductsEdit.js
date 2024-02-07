// ProductsAdd.js 파일
import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as S from "../../styles/adminPage/ProductsEdit.js";

import AdminInput from "../../shared/adminPage/components/AdminInput";
import AdminInputText from "../../shared/adminPage/components/AdminInputText";
import Card from "../../shared/adminPage/components/Card";

import AdminButtonGrey from "../../components/adminPage/AdminButtonGrey.js";
import AdminButtonBlack from "../../components/adminPage/AdminButtonBlack";
import AdminTextarea from "../../shared/adminPage/components/AdminTextarea.js";
import SelectBoxProduct from "../../shared/adminPage/components/SelectBoxProduct";
import SelectBoxCategory from "../../shared/adminPage/components/SelectBoxCategory";
import AdminSelect from "../../shared/adminPage/components/AdminSelect";
import axios from "axios";
import UploadThumbnailEdit from "../../shared/adminPage/components/UploadThumbnailEdit";
import UploadDetailEdit from "../../shared/adminPage/components/UploadDetailEdit";
import SelectBoxOptionSize from "../../shared/adminPage/components/SelectBoxOptionSize";
// import ModifiedOptionText from "../../shared/ModifiedOptionText.js";
import AdminOptionSize from "../../shared/adminPage/components/AdminOptionSize.js";

function ProductsEdit() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [newProductName, setNewProductName] = useState("");
  const [newProductInfo, setNewProductInfo] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newProductStatus, setNewProductStatus] = useState("");
  const [newThumbnailUrl, setNewThumbnailUrl] = useState("");
  const [newDetailUrls, setNewDetailUrls] = useState("");
  const [newSize, setNewSize] = useState("");
  const [newColor, setNewColor] = useState("");

  const [alertProductName, setAlertProductName] = useState("");
  const [alertProductPrice, setAlertProductPrice] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const [alertTextarea, setAlertTextarea] = useState("");

  const [originalThumbnailUrl, setOriginalThumbnailUrl] = useState("");
  const [originalDetailUrls, setOriginalDetailUrls] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`/api/admin/products/${productId}`);
        const productData = response.data;
        //console.log(productData);

        setNewProductName(productData.productName);
        setNewProductInfo(productData.productInfo);
        setNewProductPrice(productData.productPrice);
        setNewCategoryName(productData.category.categoryName);
        setNewProductStatus(productData.productStatus);
        setNewThumbnailUrl(productData.thumbnailUrl);
        setNewDetailUrls(productData.detailUrls);

        setOriginalThumbnailUrl(productData.thumbnailUrl);
        setOriginalDetailUrls(productData.detailUrls);

        const colorValue = productData.productoption.color;
        setNewColor(colorValue);

        const sizeValue = productData.productoption.size;
        //console.log(sizeValue);
        setNewSize(sizeValue);
      } catch (error) {
        console.error("상품 정보를 가져오는 중 에러 발생", error);
      }
    };

    fetchProductData();
    //console.log(newSize);
  }, [productId]);

  const getImageDataThumbnail = (editThumbnailUrl) => {
    console.log("이미지 데이터 썸네일 변경 전:", newThumbnailUrl);
    setNewThumbnailUrl(editThumbnailUrl);
    console.log("이미지 데이터 썸네일 변경 후:", newThumbnailUrl);
  };
  const getImageDataDetail = (editDetailUrls) => {
    setNewDetailUrls(editDetailUrls);
    console.log("디테일왔니", editDetailUrls); //왔다!
  };

  const cancelEdit = async () => {
    // 외않돼......
    setNewThumbnailUrl(originalThumbnailUrl);
    setNewDetailUrls(originalDetailUrls);

    console.log(originalThumbnailUrl);

    await setNewThumbnailUrl(originalThumbnailUrl);
    navigate(-1);
  };

  const sendData = async () => {
    try {
      const data = {
        productName: newProductName,
        productInfo: newProductInfo,
        productPrice: newProductPrice,
        categoryName: newCategoryName,
        productStatus: newProductStatus,
        thumbnailUrl: newThumbnailUrl,
        detailUrls: newDetailUrls,
        color: newColor,
        size: newSize,
      };

      const response = await axios.patch(
        `/api/admin/products/${productId}/edit`,
        data
      );
      console.log("전송 성공", response.data);
      if (response.data) {
        navigate(`/admin/products/${productId}`);
        console.log("되었다");
      } else {
        console.log("안보내짐");
      }
    } catch (error) {
      console.log("에러", error);
    }
  };

  // {
  //   newSize && (
  //     <>
  //       {console.log(newSize)}
  //       {console.log([...newSize])}
  //       {console.log(Array.from(newSize))}
  //     </>
  //   );
  // }
  //------------------------ 유효성 검사
  useEffect(() => {
    validateProductName();
    validateProductPrice();
    validateTextarea();
  }, [newProductName, newProductPrice, newProductInfo]);

  useEffect(() => {
    setTimeout(() => {
      validateColor();
    }, 300);
  }, [newColor]);

  const validateProductName = () => {
    if (newProductName.length <= 3) {
      setAlertProductName("최소 4글자 이상 입력해주세요. 특수문자 허용 😀");
    } else {
      setAlertProductName("");
    }
  };

  const validateProductPrice = () => {
    if (isNaN(newProductPrice) || newProductPrice <= 0) {
      setAlertProductPrice("숫자만 입력 가능합니다. 😀");
    } else {
      setAlertProductPrice("");
    }
  };

  const validateColor = () => {
    if (Array.isArray(newColor)) {
      // newColor가 배열인 경우
      if (
        newColor.some(
          (color) =>
            color.includes(",,") ||
            color.startsWith(",") ||
            color.endsWith(",") ||
            color.includes(" ") ||
            color.trim() === ""
        )
      ) {
        setAlertColor("공백이나 연속된 콤마, 시작과 끝에 콤마가 있습니다. 😀");
      } else {
        setAlertColor("");
      }
    } else if (typeof newColor === "string") {
      // newColor가 문자열인 경우
      if (
        newColor.includes(",,") ||
        newColor.startsWith(",") ||
        newColor.endsWith(",") ||
        newColor.includes(" ") ||
        newColor.trim() === ""
      ) {
        setAlertColor("공백이나 연속된 콤마, 시작과 끝에 콤마가 있습니다. 😀");
      } else {
        setAlertColor("");
      }
    }
  };

  const validateTextarea = () => {
    if (newProductInfo.trim() === "") {
      setAlertTextarea("상품 상세 설명란이 비어있습니다.😀");
    } else {
      setAlertTextarea("");
    }
  };
  return (
    <>
      <Card>
        <S.TitleBox>상품 수정하기</S.TitleBox>
        <S.SubTitleBox>상품 정보</S.SubTitleBox>
        <S.ProductsLayout1>
          <S.Box1>
            <AdminInput
              type="text"
              placeholder="특수문자 허용, 최소 4글자 이상"
              value={newProductName}
              onChange={setNewProductName}
              required
              minlength="4"
              onFocus={validateProductName}
            >
              상품명<S.AlertMsgBox>{alertProductName}</S.AlertMsgBox>
            </AdminInput>
            <AdminTextarea
              type="text"
              placeholder="상품 관련 상세 설명을 입력해주세요."
              value={newProductInfo}
              onChange={setNewProductInfo}
              onFocus={validateTextarea}
            >
              상품 상세 설명<S.AlertMsgBox>{alertTextarea}</S.AlertMsgBox>
            </AdminTextarea>
          </S.Box1>
          <S.Box2>
            <AdminInput
              type="number"
              placeholder="숫자만 입력 가능"
              value={newProductPrice}
              onChange={setNewProductPrice}
              required
              onFocus={validateProductPrice}
            >
              가격<S.AlertMsgBox>{alertProductPrice}</S.AlertMsgBox>
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
            {/* 실패-------------------- */}
            {/* <AdminSelect title="상품 옵션 - 사이즈">
              <AdminOptionSize
                // value={["XL"]}
                // value={`{newSize}`}
                // value={[...newSize]}
                // value={newSize}
                value={Array.from(newSize)}
                onChange={setNewSize}
              />
            </AdminSelect> */}
            {/* 실패-------------------- */}
            <AdminSelect title="상품 옵션 - 사이즈">
              <SelectBoxOptionSize value={newSize} onChange={setNewSize} />
            </AdminSelect>

            <AdminInput
              type="text"
              placeholder="상품컬러는 , 로 구분"
              value={newColor}
              onChange={setNewColor}
              onFocus={validateColor}
            >
              상품 옵션 - 컬러 <S.AlertMsgBox>{alertColor}</S.AlertMsgBox>
            </AdminInput>
          </S.Box2>
        </S.ProductsLayout1>
        <S.SubTitleBox>이미지 정보</S.SubTitleBox>

        <S.ProductsLayout2>
          <S.Box3>
            <S.SubjectBox>
              썸네일 이미지 (".png", ".jpg", ".jpeg", ".bmp")
            </S.SubjectBox>
            <S.ThumbnailBox>
              <img
                src={newThumbnailUrl}
                alt="thumbnail"
                style={{ width: "300px", height: "auto" }}
              />
            </S.ThumbnailBox>
            <UploadThumbnailEdit
              onFileChange={getImageDataThumbnail}
              productId={productId}
            />
          </S.Box3>
          <S.Box4>
            <S.SubjectBox>
              상세 이미지 (".png", ".jpg", ".jpeg", ".bmp")
            </S.SubjectBox>
            {newDetailUrls && newDetailUrls.length > 0 && (
              <>
                {newDetailUrls.map((url, index) => (
                  <div key={index}>
                    <img
                      src={url}
                      alt={`Detail ${index}`}
                      style={{ width: "300px", height: "auto" }}
                    />
                  </div>
                ))}
              </>
            )}

            <UploadDetailEdit
              onFileChange={getImageDataDetail}
              productId={productId}
            />
          </S.Box4>
        </S.ProductsLayout2>
        <br />
        <hr />
        <S.sendDataBtnWrapper>
          <AdminButtonGrey onClick={cancelEdit}>취소</AdminButtonGrey>
          <AdminButtonBlack onClick={sendData}>상품 수정하기</AdminButtonBlack>
        </S.sendDataBtnWrapper>
      </Card>
    </>
  );
}

export default ProductsEdit;
