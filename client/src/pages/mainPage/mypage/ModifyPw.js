import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import getAccessToken from "../../../hooks/getAcessToken";

function ModifyPw() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [checkResult, setCheckResult] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [newAlertText, setNewAlertText] = useState("");

  useEffect(() => {
    validatePassword();
    validateCheckPassword();
  }, [password, newPassword, checkPassword]);

  const validatePassword = () => {
    if (password.length == 0) {
      setAlertText("비밀번호를 입력해주세요");
    } else {
      setAlertText("");
    }
  };

  const validateCheckPassword = () => {
    if (newPassword == "" || checkPassword == "") {
      setNewAlertText("비밀번호를 입력해주세요");
    } else if (newPassword === checkPassword) {
      setNewAlertText("비밀번호가 일치합니다");
    } else if (!(newPassword === checkPassword)) {
      setNewAlertText("비밀번호가 일치하지 않습니다");
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
        setCheckResult(true);
        setPassword("");
      } else {
        setAlertText("비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      pwCheck();
    }
  };

  const handleEnter2 = (e) => {
    if (e.key === "Enter") {
      modifyPw();
    }
  };

  const modifyPw = async () => {
    if (newPassword == checkPassword) {
      try {
        const headers = getAccessToken();
        const res = await axios.patch(
          "/api/mypage/info/pw",
          { newPassword },
          { headers }
        );
        if (res.data.result == true) {
          alert("비밀번호가 변경되었습니다.");
          window.location.replace("/mypage/modifypw");
        } else {
          alert("변경 실패..!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h3>비밀번호 변경</h3>
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
          <FormBox
            onSubmit={(e) => {
              e.preventDefault();
            }}
            onKeyDown={handleEnter2}
          >
            <div>변경할 비밀번호를 입력해주세요</div>
            <InputWrapper>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="비밀번호"
              />
              <br />
              <Input
                type="password"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
                placeholder="비밀번호 확인"
              />
              <br />
              <div>{newAlertText}</div>
            </InputWrapper>
            <Button type="button" onClick={modifyPw}>
              확인
            </Button>
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
export default ModifyPw;
