import * as S from "./PageNationStyle.js";

function PageNation({ total, limit, page, setPage }) {
  const totalPages = Math.ceil(total / limit);

  function handlePageClick(selectPage) {
    if (selectPage >= 1 && selectPage <= totalPages) {
      setPage(selectPage);
    }
  }

  function renderPageButtons() {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <S.PageButton
          key={i}
          active={i === page}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </S.PageButton>
      );
    }
    return buttons;
  }
  return (
    <>
      <S.PageNationWrapper>
        <S.PageButton
          onClick={() => handlePageClick(page - 1)}
          disabled={page === 1}
        >
          이전
        </S.PageButton>
        {renderPageButtons()}
        <S.PageButton
          onClick={() => handlePageClick(page + 1)}
          disabled={page === totalPages}
        >
          다음
        </S.PageButton>
      </S.PageNationWrapper>
    </>
  );
}

export default PageNation;
