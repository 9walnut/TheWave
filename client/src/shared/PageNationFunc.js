import React, { useState } from "react";

function PageNationFunc(data) {
  const [currentPage, setCurrentPage] = useState(1);
  const oneOfPage = 10;

  const indexOfLastItem = currentPage * oneOfPage;
  const indexOfFirstItem = indexOfLastItem - oneOfPage;

  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  // console.log("currentItems", currentItems);

  function handlePageClick(selectPage) {
    setCurrentPage(selectPage);
  }
  return { currentItems, oneOfPage, currentPage, handlePageClick };
}

export default PageNationFunc;
