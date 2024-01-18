import React, { useEffect, useState } from "react";
import axios from "axios";

import * as S from "../../styles/adminPage/Users.js";
import Card from "../../shared/adminPage/components/Card";
import AdminButtonGrey from "../../components/adminPage/AdminButtonGrey.js";

import DataTable from "../../shared/adminPage/components/DataTable";
import PageNation from "../../shared/PageNation.js";
import PageNationFunc from "../../shared/PageNationFunc.js";
import ModifiedPhoneNumber from "../../shared/ModifiedPhoneNumber.js";
import Swal from "sweetalert2";
import AdminButtonSearch from "../../components/adminPage/AdminButtonSearch.js";
import AdminInputSearch from "../../shared/adminPage/components/AdminInputSearch.js";

const header = [
  {
    text: "NO.",
    value: "userNumber",
    width: 50,
  },
  {
    text: "아이디",
    value: "userId",
    width: 130,
  },
  {
    text: "이름",
    value: "userName",
    width: 110,
  },
  {
    text: "핸드폰 번호",
    value: "phoneNumber",
    width: 150,
  },
  {
    text: "생년월일",
    value: "birthday",
    width: 150,
  },
  {
    text: "성별",
    value: "gender",
    width: 50,
  },
  {
    text: "주소",
    value: "address",
    width: 300,
  },
];

function Users() {
  const [users, setUsers] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("userName");
  const [searchData, setSearchData] = useState([]);

  const descendingData = (a, b) => {
    return b.userNumber - a.userNumber;
  };

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
      setSearchData(modifiedData);
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

    try {
      const result = await Swal.fire({
        icon: "question",
        title: "삭제",
        html: "회원을 삭제하시겠습니까 ?",
        confirmButtonColor: "#5e748f",
        showCancelButton: true,
        confirmButtonText: "예",
        cancelButtonText: "아니오",
      });
      if (result.isConfirmed) {
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
      }
    } catch (error) {
      console.error("에러", error);
    }
  };

  //---searchItem
  const searchItem = () => {
    console.log(searchType);

    if (searchText.length === 0) {
      alert("검색 내용을 입력해주세요");
      return;
    }

    const searchItems = searchData.filter((value) => {
      const inputSearchText = searchText;

      const userNumberUser = value.userNumber_user;
      const phoneNumber = userNumberUser?.phoneNumber;

      // console.log(value.phoneNumber?.props?.phoneNumber);

      const selectSearchType =
        searchType === "userName"
          ? value.userName
          : value.phoneNumber?.props?.phoneNumber;

      return selectSearchType && selectSearchType.includes(inputSearchText);
    });

    console.log("searchData", searchData);
    console.log("searchItems", searchItems);

    setSearchText("");
    setUsers(searchItems);
  };

  const allItem = () => {
    fetchData();
  };

  return (
    <>
      <Card>
        <S.InnerCardTitleBox>회원 관리</S.InnerCardTitleBox>
        <S.SearchButtonContainer>
          <select
            name="search"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="userName">이름</option>
            <option value="phoneNumber">핸드폰 번호</option>
          </select>
          <AdminInputSearch
            type="text"
            placeholder="검색어를 입력 해주세요."
            value={searchText}
            onChange={(value) => setSearchText(value)}
          />

          <AdminButtonSearch onClick={searchItem}>검색하기</AdminButtonSearch>
          <AdminButtonSearch onClick={allItem}>전체보기</AdminButtonSearch>
        </S.SearchButtonContainer>
        <DataTable
          keySet="usersTb_"
          headers={header}
          items={currentItems}
          page={currentPage}
          onSelectionChange={onSelectionChange}
        />
        <S.BtnWrapper>
          <AdminButtonGrey onClick={deleteUsers}>회원 삭제하기</AdminButtonGrey>
        </S.BtnWrapper>
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
