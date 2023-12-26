import { useState, useEffect } from "react";

function SelectBoxCategory() {
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
        <option value="1">캐릭터</option>
        <option value="2">데이지</option>
        <option value="3">레터링</option>
        <option value="4">용돈</option>
        <option value="5">옴브레</option>
        <option value="6">장미</option>
        <option value="7">튤립</option>
      </select>
    </>
  );
}

export default SelectBoxCategory;
