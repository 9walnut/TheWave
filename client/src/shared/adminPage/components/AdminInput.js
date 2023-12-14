import * as S from "./AdminInputStyle.js";

function AdminInput(props) {
  return (
    <>
      <div>
        <S.InputBox>
          <S.AdminInputText>{props.children}</S.AdminInputText>
          <S.StyledInput
            type={props.type}
            placeholder={props.placeholder}
            style={props.style}
          />
        </S.InputBox>
      </div>
    </>
  );
}

export default AdminInput;
