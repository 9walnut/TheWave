import React from "react";

import * as S from "../../styles/adminPage/ProductsDetail.js";

import Card from "../../shared/adminPage/components/Card";

function ProductsDetail() {
  return (
    <>
      <Card>
        <h3>상품 상세 페이지</h3>
        <h3>데이터를 가져와서 쿼리스트링으로 사용해야할거같은데..? </h3>
        <h3>일단 모르겠으니 Route path="products/:productsID" </h3>
        <h3>상품 업로드한 데이터 인풋 그대로 가져와서 readonly로 ? </h3>
      </Card>
    </>
  );
}

export default ProductsDetail;
