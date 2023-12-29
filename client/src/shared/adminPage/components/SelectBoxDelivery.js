import { useState, useEffect } from "react";

// function SelectBoxDelivery({ selectedValues }) {
function SelectBoxDelivery({ selectedValues }) {
  const [releaseStatus, setReleaseStatus] = useState("");

  function handleChangeStatus(e) {
    e.preventDefault();
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
