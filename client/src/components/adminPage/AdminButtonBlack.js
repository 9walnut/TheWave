import * as S from "./AdminButtonBlackStyle.js";

function AdminButtonBlack(props) {
  return (
    <>
      <div>
        <S.AdminButtonBlackStyle>{props.children}</S.AdminButtonBlackStyle>
      </div>
    </>
  );
}

export default AdminButtonBlack;
