// SelectBoxDelivery.js
import { useState, useEffect } from "react";

// function SelectBoxDelivery({ onOrderIdChange, onStatusChange }) {
function SelectBoxDelivery({ onOrderIdChange }) {
  const [releaseStatus, setReleaseStatus] = useState("");

  function handleChangeStatus(e) {
    const selectedValue = e.target.value;
    setReleaseStatus(selectedValue);
    // console.log("SelectBoxDelivery 클릭한 Select:", selectedValue);

    if (typeof onOrderIdChange === "function") {
      onOrderIdChange(selectedValue);
    }
    // onStatusChange 함수인지 확인한 후 호출
    // onStatusChange && onStatusChange(selectedValue);
  }

  // function selectClick() {
  //   console.log("SelectBoxDelivery 클릭한 orderId:");
  // }

  useEffect(() => {
    console.log("select 변경 시 render");
  }, [releaseStatus]);

  return (
    <>
      <select
        name="releaseStatusCheck"
        onChange={handleChangeStatus}
        value={releaseStatus}
        // onClick={selectClick}
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
