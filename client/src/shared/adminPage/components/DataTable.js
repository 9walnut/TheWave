import React, { useStat, useRef, useState } from "react";
import * as S from "./DataTableStyle.js";

import SelectBoxDelivery from "./SelectBoxDelivery.js";
import CheckBox from "./CheckBox.js";
import CheckBoxHandlerChecked from "./CheckBoxHandlerChecked.js";
import CheckBoxHandlerSelectAll from "./CheckBoxHandlerSelectAll.js";
const useRowClick = (onItemClick) => {
  const onRowClick = (item, event) => {
    console.log("item", item.orderId);
    // if (onItemClick)
    //   onItemClick({
    //     productId: item.productID,
    //     orderId: item.orderId,
    //   });

    if (event && event.target.tagName !== "SELECT") {
      onItemClick?.({
        productId: item.productID,
        orderId: item.orderId,
      });
    }
  };

  return onRowClick;
};

function DataTable({ keySet, headers, items, onSelectionChange, onItemClick }) {
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

  //orders에서 받아온 데이터 가공, selectbox로 orderstatus 보내주기
  // const selectedValues = () => {
  //   const selectedValue = items.map((item) => item.orderStatus);
  //   console.log("orderStatus 확인", selectedValue);
  //   return selectedValue;
  // };

  const SelectAll = () => {
    CheckBoxHandlerSelectAll({ selectedLists, items, setSelectedLists });
  };
  const headerList = headers.map((header) => header.value);

  return (
    <>
      <S.Table>
        <thead>
          <S.TableTr>
            <S.TableTd>
              <input
                type="checkbox"
                onChange={SelectAll}
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
              onClick={(event) => onRowClick(item, event)}
            >
              <S.TableTd>
                <CheckBox
                  onChange={() => onChecked(item)}
                  checked={selectedLists.has(index)}
                />
              </S.TableTd>
              {headerList.map((value, columnIndex) => (
                <S.TableTd key={`${keySet}_${index}_${columnIndex}`}>
                  {value === "orderStatus" ? (
                    <SelectBoxDelivery
                      value={selectedStatus}
                      // selectedValues={selectedValues()}
                      onChange={(e) => {
                        e.stopPropagation(); // 이벤트 전파 중단
                        setSelectedStatus(e.target.value);
                      }}
                      onClick={(e) => e.stopPropagation()}
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
