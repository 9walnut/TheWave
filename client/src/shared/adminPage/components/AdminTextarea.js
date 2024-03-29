import React from "react";
import * as S from "./AdminTextareaStyle.js";

function AdminTextarea(props) {
  const handleChange = (event) => {
    props.onChange(event.target.value);
  };
  return (
    <>
      <div>
        <S.TextareaBox>
          <S.AdminTextareaText>{props.children}</S.AdminTextareaText>
          <S.StyledTextarea
            type={props.type}
            placeholder={props.placeholder}
            style={props.style}
            value={props.value}
            onChange={handleChange}
            onFocus={props.onFocus}
          />
        </S.TextareaBox>
      </div>
    </>
  );
}

export default AdminTextarea;
