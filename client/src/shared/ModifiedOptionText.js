import React from "react";

function ModifiedOptionText({ option }) {
  const optionText = Array.isArray(option) ? option : [];
  const optionTextString = optionText.join(", ");

  return <span>{optionTextString}</span>;
}

export default ModifiedOptionText;
