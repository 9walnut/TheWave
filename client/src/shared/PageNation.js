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
        <button key={i} active={i === page} onClick={() => handlePageClick(i)}>
          {i}
        </button>
      );
    }
    return buttons;
  }
  return (
    <>
      <button onClick={() => handlePageClick(page - 1)} disabled={page === 1}>
        이전
      </button>
      {renderPageButtons()}
      <button
        onClick={() => handlePageClick(page + 1)}
        disabled={page === totalPages}
      >
        다음
      </button>
    </>
  );
}

export default PageNation;
