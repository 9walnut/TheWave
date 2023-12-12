// ProductsAdd.js 파일
import React from "react";
import AdminInput from "../../shared/adminPage/components/AdminInput";
import AdminInputText from "../../shared/adminPage/components/AdminInputText";
import Card from "../../shared/adminPage/components/Card";

function ProductsAdd() {
  return (
    <>
      <Card>
        <h3>Products Add Page</h3>
        <AdminInputText>상품명</AdminInputText>
        <AdminInput type="text" placeholder="특수문자 허용, 최소 4글자 이상" />
        <AdminInputText>상품 상세 설명</AdminInputText>
        <textarea placeholder="상품 관련 상세 설명을 입력해주세요." />
        <AdminInputText>가격</AdminInputText>
        <AdminInput type="number" placeholder="숫자만 입력 가능" />
        <AdminInputText>상품 카테고리</AdminInputText>
        <AdminInput type="text" placeholder="셀렉트로 변경" />
        <AdminInputText>상태</AdminInputText>
        <AdminInput type="text" placeholder="셀렉트로 변경" />
        <AdminInputText>상품 정보</AdminInputText>
        <AdminInput type="text" placeholder="관리자 메모" />
      </Card>
    </>
  );
}

export default ProductsAdd;
