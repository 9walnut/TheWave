import React from "react";

function ModifiedOptionText({ option }) {
  const optionText = option || [];
  const optionTextString = optionText.join(", ");

  return <span>{optionTextString}</span>;
}

export default ModifiedOptionText;
