import React from "react";

import * as S from "../../styles/adminPage/Users.js";

import Card from "../../shared/adminPage/components/Card";
import DataTable from "../../shared/adminPage/components/DataTable";

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
  return (
    <>
      <Card>
        <h3>회원 관리</h3>
        <ol>
          <li>✅체크박스로 선택 가능하도록 (전체선택, 회원삭제 버튼)</li>
          <li>✅상세조회는 없음</li>
          <li>✅10명씩. 페이지네이션</li>
        </ol>
        <DataTable keySet="usersTb_" headers={header} items={DUMMY} />
      </Card>
    </>
  );
}

export default Users;
