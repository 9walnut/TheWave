import * as S from "./AdminButtonSearchStyle.js";

function AdminButtonSearch({ onClick, children }) {
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

export default AdminButtonSearch;
