import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import * as S from "../../styles/adminPage/Products.js";
import Card from "../../shared/adminPage/components/Card";
import AdminButtonBlack from "../../components/adminPage/AdminButtonBlack.js";

import PageNation from "../../shared/PageNation.js";
import PageNationFunc from "../../shared/PageNationFunc.js";
import DataTable from "../../shared/adminPage/components/DataTable";

const header = [
  {
    text: "NO.",
    value: "productID",
  },
  {
    text: "상품명",
    value: "productName",
  },
  // {
  //   text: "카테고리아이디",
  //   value: "categoryID",
  // },
  {
    text: "카테고리",
    value: "categoryName",
  },
  {
    text: "가격",
    value: "productPrice",
  },
  {
    text: "상태",
    value: "productStatus",
  },
  {
    text: "정보",
    value: "productInfo",
  },
];

const DUMMY = [
  {
    productID: 1,
    productName: "루돌프풍선",
    // categoryID: 2,
    categoryName: "커스텀풍선",
    productPrice: 17000,
    productStatus: "판매중",
    productInfo: "이렇다",
  },
  {
    productID: 2,
    productName: "곰돌이풍선",
    // categoryID: 3,
    categoryName: "용돈풍선",
    productPrice: 17000,
    productStatus: "재고없음",
    productInfo: "저렇다",
  },
  {
    productID: 3,
    productName: "루돌프풍선",
    // categoryID: 2,
    categoryName: "커스텀풍선",
    productPrice: 17000,
    productStatus: "판매중",
    productInfo: "이렇다",
  },
  {
    productID: 4,
    productName: "곰돌이풍선",
    // categoryID: 3,
    categoryName: "용돈풍선",
    productPrice: 17000,
    productStatus: "재고없음",
    productInfo: "저렇다",
  },
  {
    productID: 5,
    productName: "루돌프풍선",
    // categoryID: 2,
    categoryName: "커스텀풍선",
    productPrice: 17000,
    productStatus: "판매중",
    productInfo: "이렇다",
  },
  {
    productID: 6,
    productName: "곰돌이풍선",
    // categoryID: 3,
    categoryName: "용돈풍선",
    productPrice: 17000,
    productStatus: "재고없음",
    productInfo: "저렇다",
  },
  {
    productID: 7,
    productName: "루돌프풍선",
    // categoryID: 2,
    categoryName: "커스텀풍선",
    productPrice: 17000,
    productStatus: "판매중",
    productInfo: "이렇다",
  },
  {
    productID: 8,
    productName: "곰돌이풍선",
    // categoryID: 3,
    categoryName: "용돈풍선",
    productPrice: 17000,
    productStatus: "재고없음",
    productInfo: "저렇다",
  },
  {
    productID: 9,
    productName: "루돌프풍선",
    // categoryID: 2,
    categoryName: "커스텀풍선",
    productPrice: 17000,
    productStatus: "판매중",
    productInfo: "이렇다",
  },
  {
    productID: 10,
    productName: "곰돌이풍선",
    // categoryID: 3,
    categoryName: "용돈풍선",
    productPrice: 17000,
    productStatus: "재고없음",
    productInfo: "저렇다",
  },
  {
    productID: 11,
    productName: "루돌프풍선",
    // categoryID: 2,
    categoryName: "커스텀풍선",
    productPrice: 17000,
    productStatus: "판매중",
    productInfo: "이렇다",
  },
  {
    productID: 12,
    productName: "곰돌이풍선",
    // categoryID: 3,
    categoryName: "용돈풍선",
    productPrice: 17000,
    productStatus: "재고없음",
    productInfo: "저렇다",
  },
];
function Products() {
  //---해체 할당. return 된 객체에서 원하는 속성 추출, 변수로 사용
  const { currentPage, oneOfPage, currentItems, handlePageClick } =
    PageNationFunc(DUMMY);

  //---deleteProducts (진행중)
  const [items, setItems] = useState(DUMMY);
  console.log("바뀐 items 넘어오는거 확인", items);

  //---axios
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/admin/products");
        console.log("response", response.data);

        setProducts(response.data);
      } catch (error) {
        console.error("에러", error.response.data);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Card>
        <h3>상품 관리</h3>
        <DataTable
          keySet="productsTb_"
          headers={header}
          items={currentItems}
          setItems={setItems}
          setDelete="true"
          btnMsg="선택 상품 삭제하기"
        />
        <S.ButtonContainer>
          <Link to="/admin/products/add">
            <AdminButtonBlack>상품 등록하기</AdminButtonBlack>
          </Link>
        </S.ButtonContainer>
        <PageNation
          total={DUMMY.length}
          limit={oneOfPage}
          page={currentPage}
          setPage={handlePageClick}
        />
      </Card>
    </>
  );
}

export default Products;
