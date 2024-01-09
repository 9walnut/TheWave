import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import getAccessToken from "../../../hooks/getAcessToken";

function ModifyPw() {
  const [password, setPassword] = useState("");
  const [checkResult, setCheckResult] = useState(false);

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
            <div>비밀번호를 입력해주세요</div>
            <InputWrapper>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
              />
            </InputWrapper>
            <Button type="button" onClick={pwCheck}>
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
