import { useEffect, useState } from "react";

function CheckBox({ onChange, checked }) {
  // const [releaseStatus, setReleaseStatus] = useState("");
  // console.log(page);

  // useEffect(() => {
  //   setReleaseStatus(CheckedValue);
  // }, [CheckedValue]);

  return (
    <>
      <input
        type="checkbox"
        onChange={onChange}
        checked={checked}
        // value={releaseStatus}
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    </>
  );
}

export default CheckBox;
