import * as S from "./AdminInputStyle.js";
import React from "react";

function AdminInput(props) {
  const handleChange = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <>
      <div>
        <S.InputBox>
          <S.AdminInputText>{props.children}</S.AdminInputText>
          <S.StyledInput
            type={props.type}
            placeholder={props.placeholder}
            style={props.style}
            value={props.value}
            onChange={handleChange}
            onFocus={props.onFocus}
          />
        </S.InputBox>
      </div>
    </>
  );
}

export default AdminInput;
