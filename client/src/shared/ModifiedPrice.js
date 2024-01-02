import React from "react";

function ModifiedPrice({ number }) {
  const formatNumber = (num) => {
    const numberStr = num.toString();
    const chunks = [];

    for (let i = numberStr.length; i > 0; i -= 3) {
      chunks.unshift(numberStr.slice(Math.max(0, i - 3), i));
    }

    return chunks.join(",");
  };

  return <>{formatNumber(number)}</>;
}

export default ModifiedPrice;
