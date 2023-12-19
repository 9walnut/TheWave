import React, { useState } from "react";

import * as S from "../../styles/adminPage/Users.js";
import Card from "../../shared/adminPage/components/Card";

import DataTable from "../../shared/adminPage/components/DataTable";
import PageNation from "../../shared/PageNation.js";
import PageNationFunc from "../../shared/PageNationFunc.js";

const header = [
  {
    text: "NO.",
    value: "userNumber",
  },
  {
    text: "아이디",
    value: "userId",
  },
  {
    text: "이름",
    value: "userName",
  },
  {
    text: "핸드폰 번호",
    value: "phoneNumber",
  },
  {
    text: "생년월일",
    value: "birthday",
  },
  {
    text: "성별",
    value: "gender",
  },
  {
    text: "주소",
    value: "address",
  },
];

const DUMMY = [
  {
    userNumber: 1,
    userId: "che",
    userName: "내이름",
    phoneNumber: "01000000000",
    birthday: "1995-08-11",
    gender: "여",
    address: "서울시 구로구 ",
  },
];

function Users() {
  const { currentPage, oneOfPage, currentItems, handlePageClick } =
    PageNationFunc(DUMMY);

  const [items, setItems] = useState(DUMMY);
  console.log("바뀐 items 넘어오는거 확인", items);

  return (
    <>
      <Card>
        <h3>회원 관리</h3>
        <ol>
          <li>✅상세조회 없음</li>
        </ol>
        <DataTable
          keySet="usersTb_"
          headers={header}
          items={currentItems}
          setItems={setItems}
          setDelete="true"
          btnMsg="회원 삭제하기"
        />
        {/* <AdminButtonGrey>선택 회원 삭제하기</AdminButtonGrey> */}
        <PageNation
          total={DUMMY.length}
          limit={oneOfPage}
          page={currentPage}
          setPage={handlePageClick}
        />
      </Card>
    </>
  );
}

export default Users;
