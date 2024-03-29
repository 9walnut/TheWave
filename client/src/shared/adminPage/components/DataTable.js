import React, { useState, useEffect } from "react";
import * as S from "./DataTableStyle.js";

import SelectBoxDelivery from "./SelectBoxDelivery.js";
import CheckBox from "./CheckBox.js";
import CheckBoxHandlerChecked from "./CheckBoxHandlerChecked.js";
import CheckBoxHandlerSelectAll from "./CheckBoxHandlerSelectAll.js";

const useRowClick = (onItemClick, onStatusChange) => {
  const onRowClick = (item, event) => {
    if (event && event.target.tagName !== "SELECT") {
      onItemClick?.({
        productId: item.productID,
        orderId: item.orderId,
      });
    }

    onStatusChange?.({
      outStatus: item.selectedStatus,
      orderId: item.orderId,
    });
  };

  return onRowClick;
};

function DataTable({
  keySet,
  headers,
  items,
  onSelectionChange,
  onItemClick,
  onStatusChange,
  page,
  hideCheckboxes,
}) {
  if (!headers || !headers.length) {
    throw new Error("<DataTable /> headers is required.");
  }

  const [selectedLists, setSelectedLists] = useState(new Set());
  const [selectedStatus, setSelectedStatus] = useState("");
  const [newSelectedValue, setNewSelectedValue] = useState("");
  const [selectBox, setSelectBox] = useState("");
  const [selectBoxId, setSelectBoxId] = useState("");

  const onRowClick = useRowClick(onItemClick, onStatusChange);

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

  useEffect(() => {
    setSelectedLists(new Set());
  }, [page]);

  const headerList = headers.map((header) => header.value);

  const etxText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <>
      <S.TableContainer>
        <S.Table>
          <thead>
            <S.TableTr>
              {!hideCheckboxes && (
                <S.TableInputTd>
                  <input
                    type="checkbox"
                    onChange={SelectAll}
                    checked={selectedLists.size === items.length}
                  />
                </S.TableInputTd>
              )}
              {headers.map((header) => (
                <S.TableHeader
                  key={header.text}
                  text={header.text}
                  width={header.width}
                >
                  {header.value === "deliveryStatus"
                    ? header.text
                    : header.text}
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
                {!hideCheckboxes && (
                  <S.TableTd>
                    <CheckBox
                      onChange={() => onChecked(item)}
                      checked={selectedLists.has(index)}
                      currentPage={page}
                    />
                  </S.TableTd>
                )}
                {headerList.map((value, columnIndex) => (
                  <S.TableTd
                    key={`${keySet}_${index}_${columnIndex}`}
                    style={{ padding: "10px" }}
                  >
                    {value === "orderStatus" ? (
                      <SelectBoxDelivery
                        initialStatus={item.orderStatus}
                        onChange={(e) => {
                          e.stopPropagation();
                          setSelectedStatus(e.target.value);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        onOrderIdChange={(selectedValue) => {
                          setNewSelectedValue(selectedValue);
                          onStatusChange({
                            outStatus: selectedValue,
                            orderId: item.orderId,
                          });
                        }}
                        onOrderIdValue={item.orderId}
                      />
                    ) : (
                      etxText(item[value], 40)
                    )}
                  </S.TableTd>
                ))}
              </S.TableTr>
            ))}
          </tbody>
        </S.Table>
      </S.TableContainer>
    </>
  );
}

export default DataTable;
