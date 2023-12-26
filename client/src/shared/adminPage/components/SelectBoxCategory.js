import { useState, useEffect } from "react";

function SelectBoxCategory({ value, onChange }) {
  const [releaseStatus, setReleaseStatus] = useState("");

  function handleChangeStatus(e) {
    const selectedValue = e.target.value;
    setReleaseStatus(selectedValue);
    console.log("카테고리 select", selectedValue);
    onChange(selectedValue);
  }

  useEffect(() => {
    console.log("select 변경 시 render", releaseStatus);
  }, [releaseStatus]);
  return (
    <>
      <select
        name="releaseStatusCheck"
        onChange={handleChangeStatus}
        value={value}
      >
        <option disabled value="" selected>
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
