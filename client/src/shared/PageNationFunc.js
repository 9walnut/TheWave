import React, { useState } from "react";

function PageNationFunc(DUMMY) {
  const [currentPage, setCurrentPage] = useState(1);
  const oneOfPage = 10;

  const indexOfLastItem = currentPage * oneOfPage;
  const indexOfFirstItem = indexOfLastItem - oneOfPage;

  const currentItems = DUMMY.slice(indexOfFirstItem, indexOfLastItem);

  function handlePageClick(selectPage) {
    setCurrentPage(selectPage);
  }
  return { currentItems, oneOfPage, currentPage, handlePageClick };
}

export default PageNationFunc;
