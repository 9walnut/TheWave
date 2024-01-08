import React from "react";

function ModifiedOptionText({ option }) {
  const optionText = Array.isArray(option) ? option : [];
  const optionTextString = optionText.join(", ");

  return <span>{optionTextString}</span>;
}

export default ModifiedOptionText;

//상품옵션 더미데이터였을 때 배열로 들어와서 생성해놓은 함수
//지금은 필요없음
//["빨강", "하양", "파랑"] 으로 들어오면 빨강, 하양, 파랑 으로 변환
