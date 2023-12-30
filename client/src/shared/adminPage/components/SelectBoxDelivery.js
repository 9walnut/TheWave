import { useState, useEffect } from "react";

// function SelectBoxDelivery({ selectedValues }) {
function SelectBoxDelivery({ onOrderIdChange }) {
  const [releaseStatus, setReleaseStatus] = useState("");

  function handleChangeStatus(e) {
    const selectedValue = e.target.value;
    setReleaseStatus(selectedValue);
    console.log("뭐골랐니", selectedValue);

    // onOrderIdChange && onOrderIdChange(selectedValue);
  }

  function handleOnSelect(e) {
    console.log("SelectBoxDelivery 클릭한 orderId", onOrderIdChange);
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
        onClick={handleOnSelect}
      >
        <option disabled defaultValue>
          출고 상태 변경
        </option>
        <option value="결제대기">결제 대기</option>
        <option value="출고대기">출고 대기</option>
        <option value="출고">출고</option>
        <option value="취소">취소</option>
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
