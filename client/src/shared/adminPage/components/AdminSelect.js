import * as S from "./AdminSelectStyle.js";

function AdminSelect(props) {
  const handleChange = (event) => {
    props.onChange(event.target.value);
    console.log(`select 입력값 확인 (${props.children}):`, event.target.value);
  };
  return (
    <>
      <S.SelectBox>
        <S.AdminInputText>{props.title}</S.AdminInputText>
        {props.children}
      </S.SelectBox>
    </>
  );
}

export default AdminSelect;
