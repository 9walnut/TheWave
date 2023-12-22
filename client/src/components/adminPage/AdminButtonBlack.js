import * as S from "./AdminButtonBlackStyle.js";

function AdminButtonBlack({ onClick, children }) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <>
      <div>
        <S.AdminButtonBlackStyle onClick={handleClick}>
          {children}
        </S.AdminButtonBlackStyle>
      </div>
    </>
  );
}

export default AdminButtonBlack;
