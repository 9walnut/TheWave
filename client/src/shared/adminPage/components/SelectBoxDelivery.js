// SelectBoxDelivery.js
import { useState, useEffect } from "react";

function SelectBoxDelivery({ onOrderIdChange, onOrderIdValue }) {
  const [releaseStatus, setReleaseStatus] = useState("");

  // 현재 페이지에서 orderId가 변경될 때마다 값 변경 (셀렉트박스 값 리셋)
  useEffect(() => {
    setReleaseStatus(onOrderIdValue);
  }, [onOrderIdValue]);

  function handleChangeStatus(e) {
    onOrderIdChange?.(e.target.value);
    console.log("SelectBoxDelivery 클릭한 orderId:", onOrderIdValue);

    const selectedValue = e.target.value;
    setReleaseStatus(selectedValue);
    console.log("SelectBoxDelivery 클릭한 Select:", selectedValue);

    if (typeof onOrderIdChange === "function") {
      onOrderIdChange(selectedValue);
    }
  }

  useEffect(() => {
    // console.log("select 변경 시 render");
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
        <option value="결제대기">결제 대기</option>
        <option value="출고대기">출고 대기</option>
        <option value="출고">출고</option>
        <option value="취소">취소</option>
      </select>
    </>
  );
}

export default SelectBoxDelivery;
