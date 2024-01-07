import axios from "axios";
import { useState } from "react";
import getAccessToken from "../../../hooks/getAcessToken";

function MypageInfo() {
  const [password, setPassword] = useState("");
  const [checkResult, setCheckResult] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
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

  // const getUserInfo = async () => {
  //   try {
  //     const res = await axios.get("api/mypage/info");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const patchUserInfo = async () => {
    try {
      const res = await axios.patch("api/mypage/info");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h3>내 정보 수정</h3>
      {!checkResult && (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            onKeyDown={handleEnter}
          >
            <div>비밀번호를 입력해주세요</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={pwCheck}>
              확인
            </button>
          </form>
        </>
      )}
      {checkResult && (
        <>
          <div>비밀번호 인증 성공.</div>
        </>
      )}
    </>
  );
}
export default MypageInfo;
