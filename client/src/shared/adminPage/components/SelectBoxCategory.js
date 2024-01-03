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
    // console.log("select 변경 시 render", releaseStatus);
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
        <option value="캐릭터">캐릭터</option>
        <option value="데이지">데이지</option>
        <option value="레터링">레터링</option>
        <option value="용돈">용돈</option>
        <option value="옴브레">옴브레</option>
        <option value="장미">장미</option>
        <option value="튤립">튤립</option>
      </select>
    </>
  );
}

export default SelectBoxCategory;
