import React from "react";

// import "../components/DataTable.css";
import * as S from "./DataTableStyle.js";

function DataTable({ headers, items }) {
  if (!headers || !headers.length) {
    throw new Error("<DataTable /> headers is required.");
  }

  //헤더가 작성한 순서대로 보여질 수 있도록 value값만 확실히 뽑아내기
  const headerList = headers.map((header) => header.value);
  return (
    <>
      <S.Table>
        <thead>
          <S.TableTr>
            {headers.map((header) => (
              <S.TableHeader key={header.text}>{header.text}</S.TableHeader>
            ))}
          </S.TableTr>
        </thead>
        <tbody>
          {items.map((items) => (
            <S.TableTr key={items.productID}>
              {headerList.map((value) => (
                <S.TableTd key={value}>{items[value]}</S.TableTd>
              ))}
            </S.TableTr>
          ))}
        </tbody>
      </S.Table>
    </>
  );
}

export default DataTable;
