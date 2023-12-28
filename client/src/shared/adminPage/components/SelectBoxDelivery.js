import { useState, useEffect } from "react";

//✅ onChange로 선택 값 바뀌면 그거 가져와서 수정요청 되도록?
//피그마 페이지 확인
//데이터 받아올 때 status 값에 따라 select value 적용되도록 세팅?

function SelectBoxDelivery() {
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
          출고 상태 변경
        </option>
        <option value="1">결제 대기</option>
        <option value="2">출고 대기</option>
        <option value="3">출고</option>
        <option value="4">취소</option>
      </select>
    </>
  );
}

export default SelectBoxDelivery;

{
  /* <option value="payWait">결제 대기</option>
<option value="deliveryWait">출고 대기</option>
<option value="deliveryStart">출고</option>
<option value="cancel">취소</option> */
}
