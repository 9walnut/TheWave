function CheckBox({ onChange, checked }) {
  return (
    <>
      <input
        type="checkbox"
        onChange={onChange}
        checked={checked}
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    </>
  );
}

export default CheckBox;
