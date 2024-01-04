import { useState } from "react";
// import styled from "styled-components";

function SelectBox() {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const selectColor = [
    { value: "red", name: "빨강" },
    { value: "green", name: "초록" },
    { value: "blue", name: "파랑" },
  ];

  const selectSize = [
    { value: "small", name: "소" },
    { value: "medium", name: "중" },
    { value: "large", name: "대" },
  ];

  const handleSize = (e) => {
    setSize(e.target.value);
  };

  const handleColor = (e) => {
    setColor(e.target.value);
  };

  return (
    <>
      <select onChange={handleColor} value={color}>
        {selectColor.map((item) => {
          return (
            <option value={item.value} key={item.value}>
              {item.name}
            </option>
          );
        })}
      </select>
      {/*  */}
      <select onChange={handleSize} value={size}>
        {selectSize.map((item) => {
          return (
            <option value={item.value} key={item.value}>
              {item.name}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default SelectBox();
