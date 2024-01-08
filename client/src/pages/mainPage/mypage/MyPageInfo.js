import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import getAccessToken from "../../../hooks/getAcessToken";
import { setUser } from "../../../redux/reducers/userSlice";
import AddressComponent from "../../../components/register/AddressComponent";

function MypageInfo() {
  const [password, setPassword] = useState("");
  const [checkResult, setCheckResult] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");

  const pwCheck = async () => {
    try {
      const headers = getAccessToken();
      const res = await axios.post(
        "/api/mypage/pwCheck",
        { password },
        { headers }
      );
      if (res.data.result == true) {
        setCheckResult(true);
        console.log("정보임", res.data);
        const { birthday, phoneNumber, userName, userId } = res.data.userInfo;
        setPhoneNumber(phoneNumber);
        setUserName(userName);
        setUserId(userId);
        setBirthday(birthday);
        setAddress(res.data.userAddress.address);
        console.log(address);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      if (password === "") {
        alert("패스워드를 입력해주세요.");
      } else {
        pwCheck();
      }
    }
  };
  const getAddress = (addressData) => {
    // console.log("address데이타입니다다다다", addressData);
    const newAddress = `${addressData.selectAddress} ${addressData.postNumber} ${addressData.detailAddress}`;
    // console.log("newAddress입니다.", newAddress);
    setAddress(newAddress);
    // return newAddress;
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
      }
    } catch (error) {
      console.log(error);
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
            <div>비밀번호를 입력해주세요</div>
            <InputWrapper>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
              />
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
              <AddressComponent getAddress={getAddress} address={address} />
            </InputWrapper>
            <Button onClick={patchUserInfo}>수정</Button>
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
