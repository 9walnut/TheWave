// ProductsAdd.js 파일
import React from "react";
import AdminInput from "../../shared/adminPage/components/AdminInput";
import AdminInputText from "../../shared/adminPage/components/AdminInputText";
import Card from "../../shared/adminPage/components/Card";

import AdminButtonBlack from "../../components/adminPage/AdminButtonBlack";

function ProductsAdd() {
  const textAreaStyle = {
    width: "590px",
    height: "300px",
  };
  return (
    <>
      <Card>
        <h3>Products Add Page</h3>
        <hr />

        <h3>상품 정보</h3>
        <AdminInput type="text" placeholder="특수문자 허용, 최소 4글자 이상">
          상품명
        </AdminInput>
        <AdminInput
          type="text"
          placeholder="상품 관련 상세 설명을 입력해주세요."
          style={textAreaStyle}
        >
          상품 상세 설명
        </AdminInput>
        <AdminInput type="number" placeholder="숫자만 입력 가능">
          가격
        </AdminInput>
        <AdminInput type="text" placeholder="셀렉트로 변경">
          상품 카테고리
        </AdminInput>
        <AdminInput type="text" placeholder="셀렉트로 변경">
          상태
        </AdminInput>
        <AdminInput type="text" placeholder="관리자 메모">
          상품 정보
        </AdminInput>
        <hr />
        <h3>이미지 정보</h3>
        <h3>얘도 문제군</h3>
        <AdminButtonBlack>상품 등록하기</AdminButtonBlack>
      </Card>
    </>
  );
}

export default ProductsAdd;
