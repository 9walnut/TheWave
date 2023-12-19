import React, { useState } from "react";

import * as S from "./DataTableStyle.js";
import AdminButtonGrey from "../../../components/adminPage/AdminButtonGrey.js";

import SelectBox from "./SelectBox.js";
import CheckBox from "./CheckBox.js";
import CheckBoxHandlerChecked from "./CheckBoxHandlerChecked.js";
import CheckBoxHandlerSelectAll from "./CheckBoxHandlerSelectAll.js";
import CheckBoxHandlerDelete from "./CheckBoxHandlerDelete.js";

function DataTable({ keySet, headers, items, setItems, setDelete, btnMsg }) {
  if (!headers || !headers.length) {
    throw new Error("<DataTable /> headers is required.");
  }
  const [selectedLists, setSelectedLists] = useState(new Set());
  const [selectedStatus, setSelectedStatus] = useState("");

  const onChecked = (item) => {
    CheckBoxHandlerChecked({
      item,
      selectedLists,
      setSelectedLists,
      setSelectedStatus,
      items,
    });
  };

  const SelectAll = () => {
    CheckBoxHandlerSelectAll({ selectedLists, items, setSelectedLists });
  };

  const deleteChecked = () => {
    CheckBoxHandlerDelete({ selectedLists, items, setItems });
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
                <CheckBox
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
