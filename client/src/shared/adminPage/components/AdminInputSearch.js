import React from "react";

function AdminInputSearch(props) {
  const handleChange = (e) => {
    if (props.onChange) {
      props.onChange(e.target.value);
    }
  };
  return (
    <>
      <input
        type={props.type}
        placeholder={props.placeholder}
        style={props.style}
        value={props.value}
        onChange={handleChange}
      />
    </>
  );
}

export default AdminInputSearch;
