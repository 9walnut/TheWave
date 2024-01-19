import React from "react";
import * as S from "./AdminInputSearchStyle.js";

function AdminInputSearch(props) {
  const handleChange = (e) => {
    if (props.onChange) {
      props.onChange(e.target.value);
    }
  };
  return (
    <>
      <S.InputBox>
        <S.StyledInput
          type={props.type}
          placeholder={props.placeholder}
          style={props.style}
          value={props.value}
          onChange={handleChange}
        />
      </S.InputBox>
    </>
  );
}

export default AdminInputSearch;
