import * as S from "./AdminButtonGreyStyle.js";

function AdminButtonGrey({ onClick, children }) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div>
      <S.AdminButtonGreyStyle onClick={handleClick}>
        {children}
      </S.AdminButtonGreyStyle>
    </div>
  );
}

export default AdminButtonGrey;
