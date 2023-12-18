import React, { useState } from "react";

// import "../components/DataTable.css";
import * as S from "./DataTableStyle.js";
import SelectBox from "./SelectBox.js";
import AdminButtonGrey from "../../../components/adminPage/AdminButtonGrey.js";

function DataTable({ keySet, headers, items, setItems, setDelete, btnMsg }) {
  if (!headers || !headers.length) {
    throw new Error("<DataTable /> headers is required.");
  }
  const [selectedLists, setSelectedLists] = useState(new Set());
  const [selectedStatus, setSelectedStatus] = useState("");

  const onChecked = (item) => {
    const newSelectedLists = new Set(selectedLists);
    const checkedItem = items.findIndex((i) => i === item);
    if (newSelectedLists.has(checkedItem)) {
      newSelectedLists.delete(checkedItem);
    } else {
      newSelectedLists.add(checkedItem);
    }

    const selectedStatus =
      Array.from(newSelectedLists).length > 0 ? "your_selected_value" : "";
    setSelectedStatus(selectedStatus);

    setSelectedLists(newSelectedLists);

    const selectedContents = Array.from(newSelectedLists).map(
      (index) => items[index]
    );
    const selectedProductId = Array.from(newSelectedLists).map(
      (index) => items[index].productID
    );

    console.log("selectedContents", selectedContents);
    console.log("selectedProductId", selectedProductId);
  };

  const SelectAll = () => {
    const selectedAll = selectedLists.size === items.length;
    const newSelectedLists = new Set(
      selectedAll ? [] : items.map((_, index) => index)
    );
    setSelectedLists(newSelectedLists);

    const selectedAllContents = Array.from(newSelectedLists).map(
      (index) => items[index]
    );

    console.log("selectedAllContents", selectedAllContents);
  };

  const deleteChecked = () => {
    const selectedIndexes = Array.from(selectedLists);
    const updatedItems = items.filter(
      (_, index) => !selectedIndexes.includes(index)
    );
    const deletedItems = selectedIndexes.map((index) => items[index]);
    setItems(updatedItems);

    console.log("삭제 전 배열", items);
    console.log("뭐가 삭제될거니", deletedItems);
    console.log("삭제 후 배열", updatedItems);
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
            <S.TableTr key={`${keySet}_${index}`}>
              <S.TableTd>
                <input
                  type="checkbox"
                  onChange={() => onChecked(item)}
                  checked={selectedLists.has(index)}
                />
              </S.TableTd>
              {headerList.map((value, columnIndex) => (
                <S.TableTd key={`${keySet}_${index}_${columnIndex}`}>
                  {value === "deliveryStatus" ? (
                    <SelectBox
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
      {setDelete === "true" && (
        <AdminButtonGrey onClick={deleteChecked}>{btnMsg}</AdminButtonGrey>
      )}
    </>
  );
}

export default DataTable;
