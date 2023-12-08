import React from "react";

import "../components/DataTable.css";

function DataTable({ headers, items }) {
  if (!headers || !headers.length) {
    throw new Error("<DataTable /> headers is required.");
  }

  //헤더가 작성한 순서대로 보여질 수 있도록 value값만 확실히 뽑아내기
  const headerList = headers.map((header) => header.value);
  return (
    <>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.text}>{header.text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((items) => (
            <tr key={items.productID}>
              {headerList.map((value) => (
                <td key={value}>{items[value]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default DataTable;
