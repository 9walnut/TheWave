import { useState, useEffect } from "react";

function SelectBox() {
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
        <option value="payWait">결제 대기</option>
        <option value="deliveryStart">출고</option>
        <option value="cancel">취소</option>
      </select>
    </>
  );
}

export default SelectBox;
