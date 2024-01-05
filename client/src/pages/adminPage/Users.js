import React, { useEffect, useState } from "react";
import axios from "axios";

import * as S from "../../styles/adminPage/Users.js";
import Card from "../../shared/adminPage/components/Card";
import AdminButtonGrey from "../../components/adminPage/AdminButtonGrey.js";

import DataTable from "../../shared/adminPage/components/DataTable";
import PageNation from "../../shared/PageNation.js";
import PageNationFunc from "../../shared/PageNationFunc.js";
import ModifiedPhoneNumber from "../../shared/ModifiedPhoneNumber.js";

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

function Users() {
  const [users, setUsers] = useState([]);

  const descendingData = (a, b) => {
    return b.userNumber - a.userNumber;
  };

  // const descendingData = (a, b) => {
  //   return b.userId.localeCompare(a.userId);
  // };

  //---axios get
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/admin/users");
      // console.log("response", response.data);

      const modifiedData = response.data.map((user) => ({
        userNumber: user.userNumber,
        userId: user.userId,
        userName: user.userName,
        phoneNumber: <ModifiedPhoneNumber phoneNumber={user.phoneNumber} />,
        birthday: user.birthday,
        gender: user.gender,
        address: user.addresses[0].address,
        // address: user.addresses.map((address) => address.address),
      }));
      modifiedData.sort(descendingData);

      setUsers(modifiedData);
      // console.log("user 데이터 들어왔나", users);
    } catch (error) {
      console.log("에러", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //---PageNation
  const { currentPage, oneOfPage, currentItems, handlePageClick } =
    PageNationFunc(users);

  //---체크 된 값 가져오기
  const [selectedUserNumbers, setSelectedUserNumbers] = useState([]);
  const onSelectionChange = (selectedUserNumber) => {
    setSelectedUserNumbers(selectedUserNumber);
    console.log("onSelectionChange 호출됨:", selectedUserNumber); // 오고있음
  };

  //---axios delete
  const deleteUsers = async () => {
    console.log("deleteUsers 함수 호출되냐");
    console.log("삭제할 UserNumber:", selectedUserNumbers.selectedUserNumber);

    if (window.confirm("정말 회원을 삭제하시겠습니까?")) {
      try {
        const response = await axios.delete("/api/admin/users", {
          data: { userNumber: selectedUserNumbers.selectedUserNumber },
        });
        console.log("서버 응답 확인", response.data);

        if (response.data.message === "회원 삭제 성공") {
          console.log("유저 삭제 완료");
          await fetchData();
        } else {
          console.error("유저 삭제 실패");
        }
      } catch (error) {
        console.error("에러", error);
      }
    }
  };
  return (
    <>
      <Card>
        <S.InnerCardTitleBox>회원 관리</S.InnerCardTitleBox>
        <DataTable
          keySet="usersTb_"
          headers={header}
          items={currentItems}
          onSelectionChange={onSelectionChange}
        />
        <AdminButtonGrey onClick={deleteUsers}>
          선택 회원 삭제하기
        </AdminButtonGrey>
        <PageNation
          total={users.length}
          limit={oneOfPage}
          page={currentPage}
          setPage={handlePageClick}
        />
      </Card>
    </>
  );
}

export default Users;
