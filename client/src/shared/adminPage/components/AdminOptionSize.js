import { useState, useEffect } from "react";

function AdminOptionSize(props) {
  const [checkedSize, setCheckedSize] = useState([]);
  const [initialChecked, setInitialChecked] = useState([]);

  console.log(props.value);

  const sizeValue = [
    { id: "S", name: "S" },
    { id: "M", name: "M" },
    { id: "L", name: "L" },
    { id: "XL", name: "XL" },
  ];

  const handleOnChecked = (checked, id) => {
    if (checked) {
      setCheckedSize((prev) => [...prev, id]);
    } else {
      setCheckedSize((prev) => prev.filter((item) => item !== id));
    }
  };

  useEffect(() => {
    props.onChange(checkedSize);
  }, [checkedSize, props]);

  useEffect(() => {
    setInitialChecked(props.value || []);
  }, [props.value]);

  return (
    <>
      {sizeValue.map((data) => (
        <span key={data.id}>
          <input
            type="checkbox"
            id={data.id}
            name={data.name}
            value={data.name}
            checked={initialChecked.includes(data.id)}
            onChange={(e) => {
              handleOnChecked(e.target.checked, e.target.id);
            }}
          />
          <label htmlFor={data.id}>{data.name}</label>
        </span>
      ))}
    </>
  );
}

export default AdminOptionSize;
