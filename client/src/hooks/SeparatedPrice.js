import { useState, useEffect } from "react";

function SeperatedPrice(initialValue) {
  const [value, setValue] = useState(initialValue);
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    setDisplayValue(String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }, [value]);

  return [value, displayValue, setValue];
}

export default SeperatedPrice;
