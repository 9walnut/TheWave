import { useState, useEffect } from "react";

function SelectBoxProduct() {
  const [releaseStatus, setReleaseStatus] = useState("");

  function handleChangeStatus(e) {
    const selectedValue = e.target.value;
    setReleaseStatus(selectedValue);
    console.log("뭐골랐니", selectedValue);
  }

  useEffect(() => {
    console.log("select 변경 시 render", releaseStatus);
  }, [releaseStatus]);
  return (
    <>
      <select
        name="releaseStatusCheck"
        onChange={handleChangeStatus}
        value={releaseStatus}
      >
        <option disabled defaultValue>
          카테고리 선택
        </option>
        <option value="판매중">판매 중</option>
        <option value="상품준비중">상품 준비 중</option>
      </select>
    </>
  );
}

export default SelectBoxProduct;
