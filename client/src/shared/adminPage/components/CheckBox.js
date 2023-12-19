function CheckBox({ onChange, checked }) {
  return (
    <>
      <input type="checkbox" onChange={onChange} checked={checked} />
    </>
  );
}

export default CheckBox;
