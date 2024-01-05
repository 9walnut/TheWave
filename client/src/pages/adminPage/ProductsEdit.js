// ProductsAdd.js 파일
import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as S from "../../styles/adminPage/ProductsEdit.js";

import AdminInput from "../../shared/adminPage/components/AdminInput";
import AdminInputText from "../../shared/adminPage/components/AdminInputText";
import Card from "../../shared/adminPage/components/Card";

import AdminButtonBlack from "../../components/adminPage/AdminButtonBlack";
import AdminTextarea from "../../shared/adminPage/components/AdminTextarea.js";
import SelectBoxProduct from "../../shared/adminPage/components/SelectBoxProduct";
import SelectBoxCategory from "../../shared/adminPage/components/SelectBoxCategory";
import AdminSelect from "../../shared/adminPage/components/AdminSelect";
import axios from "axios";
import UploadThumbnailEdit from "../../shared/adminPage/components/UploadThumbnailEdit";
import UploadDetailEdit from "../../shared/adminPage/components/UploadDetailEdit";
import SelectBoxOptionSize from "../../shared/adminPage/components/SelectBoxOptionSize";

function ProductsEdit() {
  const { productId } = useParams();
  const navigate = useNavigate();

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
  const [newDetailUrls, setNewDetailUrls] = useState("");

  const [newSize, setNewSize] = useState("");
  const [newColor, setNewColor] = useState("");

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

        const colorValue = productData.productoption.color[0];
        setNewColor(colorValue);

        const sizeValue = productData.productoption.size[0];
        setNewSize(sizeValue);
      } catch (error) {
        console.error("상품 정보를 가져오는 중 에러 발생", error);
      }
    };

    fetchProductData();
  }, [productId]);

  const getImageDataThumbnail = (editThumbnailUrl) => {
    setNewThumbnailUrl(editThumbnailUrl);
    console.log("썸네일왔니", editThumbnailUrl); //왔다!
  };
  const getImageDataDetail = (editDetailUrls) => {
    setNewDetailUrls(editDetailUrls);
    console.log("디테일왔니", editDetailUrls); //왔다!
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
            >
              상품명
            </AdminInput>
            <AdminTextarea
              type="text"
              placeholder="상품 관련 상세 설명을 입력해주세요."
              style={textAreaStyle}
              value={newProductInfo}
              onChange={setNewProductInfo}
            >
              상품 상세 설명
            </AdminTextarea>
          </S.Box1>
          <S.Box2>
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
            <AdminSelect title="상품 옵션 - 사이즈">
              <SelectBoxOptionSize value={newSize} onChange={setNewSize} />
            </AdminSelect>
            <AdminInput
              type="text"
              placeholder="상품컬러는 , 로 구분"
              value={newColor}
              onChange={setNewColor}
            >
              상품 옵션 - 컬러
            </AdminInput>
          </S.Box2>
        </S.ProductsLayout1>
        <S.SubTitleBox>이미지 정보</S.SubTitleBox>
        <S.ProductsLayout2>
          <S.Box3>
            <S.SubjectBox>썸네일 이미지</S.SubjectBox>
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
            <S.SubjectBox>상세 이미지 </S.SubjectBox>
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
          <AdminButtonBlack onClick={sendData}>상품 수정하기</AdminButtonBlack>
        </S.sendDataBtnWrapper>
      </Card>
    </>
  );
}

export default ProductsEdit;
