import React, { useEffect, useState } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import * as S from "../../styles/adminPage/Products.js";
import Card from "../../shared/adminPage/components/Card";
import Swal from "sweetalert2";
import AdminButtonGrey from "../../components/adminPage/AdminButtonGrey.js";
import AdminButtonBlack from "../../components/adminPage/AdminButtonBlack.js";
import AdminButtonSearch from "../../components/adminPage/AdminButtonSearch.js";

import AdminInputSearch from "../../shared/adminPage/components/AdminInputSearch.js";
import PageNation from "../../shared/PageNation.js";
import PageNationFunc from "../../shared/PageNationFunc.js";
import DataTable from "../../shared/adminPage/components/DataTable";
import ProductsDetail from "./ProductsDetail.js";
import ModifiedPrice from "../../shared/ModifiedPrice.js";

const header = [
  {
    text: "NO.",
    value: "productID",
    width: 50,
  },
  {
    text: "상품명",
    value: "productName",
    width: 230,
  },
  {
    text: "카테고리",
    value: "categoryName",
    width: 230,
  },
  {
    text: "가격",
    value: "productPrice",
    width: 150,
  },
  {
    text: "상태",
    value: "productStatus",
    width: 300,
  },
  {
    text: "정보",
    value: "productInfo",
    width: 430,
  },
];

function Products() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("");

  const navigate = useNavigate();

  const descendingData = (a, b) => {
    return b.productID - a.productID;
  };

  //---axios get
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/admin/products");
      // console.log("response", response.data);

      const filteredData = response.data.filter(
        (product) => !product.isDeleted
      );

      const modifiedData = filteredData.map((product) => ({
        productID: product.productId,
        productName: product.productName,
        categoryName: product.category.categoryname,
        productPrice: <ModifiedPrice number={product.productPrice} />,
        productStatus: product.productStatus,
        productInfo: product.productInfo,
      }));

      modifiedData.sort(descendingData);

      setProducts(modifiedData);
      // console.log(products);
      // console.log(modifiedData);
    } catch (error) {
      console.error("에러", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  //---PageNation 해체 할당. return 된 객체에서 원하는 속성 추출, 변수로 사용
  const { currentPage, oneOfPage, currentItems, handlePageClick } =
    PageNationFunc(products);

  //---axios delete
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const onSelectionChange = (selectedProductId) => {
    setSelectedProductIds(selectedProductId);
    console.log("onSelectionChange 호출됨:", selectedProductId); // 오고있음
  };

  const deleteProducts = async () => {
    if (selectedProductIds.length === 0) {
      Swal.fire({
        icon: "error",
        title: "선택된 상품이 없습니다.",
        confirmButtonColor: "#5e748f",
      });
      return;
    }
    // console.log("삭제할 제품 ID:", selectedProductIds);
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
        const response = await axios.delete("/api/admin/products", {
          data: { productId: selectedProductIds.selectedProductId },
        });
        console.log("서버 응답 왜 안되니", response.data);

        if (response.data) {
          console.log(
            "상품 삭제 완료. 삭제되면1(isDeleted: true), 아니면 0(isDeleted: false)"
          );
          await fetchData();
          setSelectedProductIds([]);
        } else {
          console.error("상품 삭제 실패");
        }
      }
    } catch (error) {
      console.error("에러", error);
    }
  };

  const searchItem = () => {
    console.log(searchType);

    if (searchText.length === 0) {
      alert("검색 내용을 입력해주세요");
      return;
    }

    const searchItems = products.filter((value) => {
      const inputSearchText = searchText;
      const selectSearchType =
        searchType === "productName" ? value.productName : value.categoryName;
      return selectSearchType.includes(inputSearchText);
    });
    console.log(products);
    console.log(searchItems);

    setSearchText("");
    setProducts(searchItems);
  };

  const allItem = () => {
    fetchData();
  };

  return (
    <>
      <Card>
        <S.InnerCardTitleBox>상품 관리</S.InnerCardTitleBox>
        <S.SearchButtonContainer>
          <select
            name="search"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="productName">상품명</option>
            <option value="categoryName">카테고리</option>
          </select>
          <AdminInputSearch
            type="text"
            placeholder="검색어를 입력 해주세요."
            value={searchText}
            onChange={(value) => setSearchText(value)}
          />

          <AdminButtonSearch onClick={searchItem}>검색하기</AdminButtonSearch>
          <AdminButtonSearch onClick={allItem}>전체보기</AdminButtonSearch>
        </S.SearchButtonContainer>
        <DataTable
          keySet="productsTb_"
          headers={header}
          items={currentItems}
          page={currentPage}
          onSelectionChange={onSelectionChange}
          // checkedItem={selectedProductIds}
          onItemClick={(item) => {
            const productId = item.productId;

            console.log("클릭한 productId:", productId);
            navigate(`/admin/products/${productId}`);
          }}
        />
        <S.ButtonContainer>
          <AdminButtonGrey onClick={deleteProducts}>
            상품 삭제하기
          </AdminButtonGrey>
          <Link to="/admin/products/add">
            <AdminButtonBlack>상품 등록하기</AdminButtonBlack>
          </Link>
        </S.ButtonContainer>
        <PageNation
          total={products.length}
          limit={oneOfPage}
          page={currentPage}
          setPage={handlePageClick}
        />
      </Card>
      <Routes>
        <Route path="/products/:productId" element={<ProductsDetail />} />
      </Routes>
    </>
  );
}

export default Products;
