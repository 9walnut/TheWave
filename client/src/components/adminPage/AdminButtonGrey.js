import * as S from "./AdminButtonGreyStyle.js";

function AdminButtonGrey(props) {
  return (
    <>
      <div>
        <S.AdminButtonGreyStyle>{props.children}</S.AdminButtonGreyStyle>
      </div>
    </>
  );
}

export default AdminButtonGrey;
