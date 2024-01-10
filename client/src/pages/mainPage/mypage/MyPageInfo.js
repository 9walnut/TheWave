import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import getAccessToken from "../../../hooks/getAcessToken";
import { setUser } from "../../../redux/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import AddressComponent from "../../../components/register/AddressComponent";
import { resetUser } from "../../../redux/reducers/userSlice";
function MypageInfo() {
  const [password, setPassword] = useState("");
  const [checkResult, setCheckResult] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState();
  const [userAddress, setUserAddress] = useState([]);
  const [alertText, setAlertText] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    validatePassword();
  }, [password]);

  const validatePassword = () => {
    if (password.length == 0) {
      setAlertText("비밀번호를 입력해주세요");
    } else {
      setAlertText("");
    }
  };

  const pwCheck = async () => {
    try {
      const headers = getAccessToken();
      const res = await axios.post(
        "/api/mypage/pwCheck",
        { password },
        { headers }
      );
      if (res.data.result == true) {
        setPassword("");
        setCheckResult(true);
        console.log("정보임", res.data);
        const { birthday, phoneNumber, userName, userId } = res.data.userInfo;
        setPhoneNumber(phoneNumber);
        setUserName(userName);
        setUserId(userId);
        setBirthday(birthday);
        setUserAddress(res.data.userAddress);
        console.log("주주소", res.data.userAddress);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      if (password === "") {
        alert("비밀번호를 입력해주세요.");
      } else {
        pwCheck();
      }
    }
  };
  const getAddress = (addressData) => {
    const newAddress = `${addressData.selectAddress}/${addressData.postNumber}/${addressData.detailAddress}`;
    setAddress(newAddress);
  };
  // const getUserInfo = async () => {
  //   try {
  //     const res = await axios.get("api/mypage/info");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const patchUserInfo = async () => {
    try {
      const data = {
        userId: userId,
        userName: userName,
        phoneNumber: phoneNumber,
        address: address,
        birthday: birthday,
      };
      const headers = getAccessToken();
      const res = await axios.patch("/api/mypage/info", data, { headers });
      console.log("수정 res", res.data);
      if (res.data.result == true) {
        alert("수정 완료");
        window.location.replace("/mypage/info");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 회원 탈퇴
  const deleteUserInfo = async () => {
    try {
      const data = {
        password: password,
      };
      const headers = getAccessToken();
      // confirm("정말 탈퇴하시겠습니까 ?")
      if (true) {
        const res = await axios.delete("/api/mypage", data, { headers });
        if (res.data.result == true) {
          alert("탈퇴 성공");
          dispatch(resetUser());
          localStorage.removeItem("accessToken");
          window.location.replace("/");
        } else {
          alert("실패");
        }
      }
    } catch (error) {
      console.log(error, "탈퇴 에러");
    }
  };

  return (
    <>
      <h3>내 정보 수정</h3>
      {!checkResult && (
        <>
          <FormBox
            onSubmit={(e) => {
              e.preventDefault();
            }}
            onKeyDown={handleEnter}
          >
            <InputWrapper>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
              />
              <br />
              <div>{alertText}</div>
            </InputWrapper>
            <Button type="button" onClick={pwCheck}>
              확인
            </Button>
          </FormBox>
        </>
      )}
      {checkResult && (
        <>
          <FormBox>
            <InputWrapper>
              <InputLabel>아이디</InputLabel>
              <DisabledInput
                type="text"
                value={userId}
                placeholder="아이디"
                disabled
              />
            </InputWrapper>
            <InputWrapper>
              <InputLabel>이름</InputLabel>
              <DisabledInput
                type="text"
                value={userName}
                placeholder="이름"
                disabled
              />
            </InputWrapper>
            <InputWrapper>
              <InputLabel>전화번호</InputLabel>
              <Input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="전화번호"
              />
            </InputWrapper>
            <InputWrapper>
              <InputLabel>생년월일</InputLabel>
              <Input
                type="text"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                placeholder="생년월일"
              />
            </InputWrapper>
            <InputWrapper>
              <InputLabel>주소</InputLabel>
              <AddressComponent
                getAddress={getAddress}
                userAddress={userAddress}
              />
            </InputWrapper>
            <Button onClick={patchUserInfo}>수정</Button>
            <Button onClick={() => setDeleteModal(!deleteModal)}>
              회원 탈퇴
            </Button>
            {deleteModal && (
              <>
                <InputWrapper>
                  <InputLabel>비밀번호</InputLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button onClick={deleteUserInfo}>탈퇴</Button>
                </InputWrapper>
              </>
            )}
          </FormBox>
        </>
      )}
    </>
  );
}

const FormBox = styled.div`
  max-width: 500px;
  margin: auto;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  box-sizing: border-box;
  text-align: center;
  align-items: center;
`;

const InputWrapper = styled.div`
  margin: 10px auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InputLabel = styled.div`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  height: 45px;
  border: none;
  border-bottom: 1px solid #e5e5e5;
`;

const DisabledInput = styled(Input)`
  background-color: #f0f0f0;
`;

const Button = styled.button`
  width: 100%;
  height: 45px;
  margin: 10px;
  border: none;
  font-weight: 900;
  cursor: pointer;
`;
export default MypageInfo;
