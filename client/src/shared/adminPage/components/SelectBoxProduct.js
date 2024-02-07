import { useState, useEffect } from "react";
import * as S from "./SelectBoxStyle.js";

function SelectBoxProduct({ value, onChange }) {
  const [releaseStatus, setReleaseStatus] = useState("");

  function handleChangeStatus(e) {
    const selectedValue = e.target.value;
    setReleaseStatus(selectedValue);
    console.log("상품 상태 select", selectedValue);

    onChange(selectedValue);
  }

  useEffect(() => {
    // console.log("select 변경 시 render", releaseStatus);
  }, [releaseStatus]);

  return (
    <>
      <S.Select
        name="releaseStatusCheck"
        onChange={handleChangeStatus}
        value={value}
      >
        <option disabled value="" selected>
          상품 상태 선택
        </option>
        <option value="판매중">판매 중</option>
        <option value="상품준비중">상품 준비 중</option>
      </S.Select>
    </>
  );
}

export default SelectBoxProduct;
