import React, { useStat, useRef, useState } from "react";
import * as S from "./DataTableStyle.js";

import SelectBoxDelivery from "./SelectBoxDelivery.js";
import CheckBox from "./CheckBox.js";
import CheckBoxHandlerChecked from "./CheckBoxHandlerChecked.js";
import CheckBoxHandlerSelectAll from "./CheckBoxHandlerSelectAll.js";
import { useNavigate, useParams } from "react-router-dom";
const useRowClick = (onItemClick) => {
  // const navigate = useNavigate();

  const onRowClick = (item) => {
    if (onItemClick) {
      onItemClick(item.productID);
      //   navigate(`/admin/products/${item.productId}`);
    }
  };

  return onRowClick;
};

function DataTable({
  keySet,
  headers,
  items,
  onSelectionChange,
  onItemClick,
  // onMouseInput,
  // inputHover,
}) {
  if (!headers || !headers.length) {
    throw new Error("<DataTable /> headers is required.");
  }
  const [selectedLists, setSelectedLists] = useState(new Set());
  const [selectedStatus, setSelectedStatus] = useState("");
  const onRowClick = useRowClick(onItemClick);

  const onChecked = (item) => {
    CheckBoxHandlerChecked({
      item,
      selectedLists,
      setSelectedLists,
      setSelectedStatus,
      items,
      onSelectionChange,
    });
  };

  const SelectAll = () => {
    CheckBoxHandlerSelectAll({ selectedLists, items, setSelectedLists });
  };

  // const inputRef = useRef(null);
  // const [isMouseOverInput, setIsMouseOverInput] = useState(false);
  // const handleMouseMove = (e) => {
  //   const inputRect = inputRef.current.getBoundingClientRect();
  //   const isOverInput =
  //     e.clientX >= inputRect.left &&
  //     e.clientX <= inputRect.right &&
  //     e.clientY >= inputRect.top &&
  //     e.clientY <= inputRect.bottom;

  //   setIsMouseOverInput(isOverInput);
  //   inputHover(isOverInput);

  //   console.log("마우스 input?", isOverInput);
  // };
  // const handleMouseEnter = () => {
  //   setIsMouseOverInput(true);
  //   console.log("마우스 input 위에 있음?", true);
  //   onMouseInput(isMouseOverInput);
  // };

  // const handleMouseLeave = () => {
  //   setIsMouseOverInput(false);
  //   console.log("마우스 input 위에 있음?", false);
  // };

  const headerList = headers.map((header) => header.value);

  return (
    <>
      <S.Table>
        <thead>
          <S.TableTr>
            <S.TableTd>
              <input
                type="checkbox"
                // ref={inputRef}
                onChange={SelectAll}
                // onMouseMove={handleMouseMove}
                checked={selectedLists.size === items.length}
              />
            </S.TableTd>
            {headers.map((header) => (
              <S.TableHeader key={header.text}>
                {header.value === "deliveryStatus" ? header.text : header.text}
              </S.TableHeader>
            ))}
          </S.TableTr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <S.TableTr
              key={`${keySet}_${index}`}
              onClick={() => onRowClick(item)}
            >
              <S.TableTd>
                {/* <CheckBox
                  onChange={() => onChecked(item)}
                  checked={selectedLists.has(index)}
                /> */}
                <input
                  type="checkbox"
                  // ref={inputRef}
                  // onMouseEnter={handleMouseEnter}
                  // onMouseLeave={handleMouseLeave}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  // onMouseMove={handleMouseMove}
                  onChange={() => onChecked(item)}
                  checked={selectedLists.has(index)}
                />
              </S.TableTd>
              {headerList.map((value, columnIndex) => (
                <S.TableTd key={`${keySet}_${index}_${columnIndex}`}>
                  {value === "deliveryStatus" ? (
                    <SelectBoxDelivery
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    />
                  ) : (
                    item[value]
                  )}
                </S.TableTd>
              ))}
            </S.TableTr>
          ))}
        </tbody>
      </S.Table>
    </>
  );
}

export default DataTable;
