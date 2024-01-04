import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../../components/mainPage/Navbar";
import Footer from "../../../components/mainPage/Footer";
import "../MainPage.css";
// import Button from "../../../components/register/Button";
// import PageName from "../../../components/register/PageName";
// import PageInput from "../../../components/register/PageInput";
import * as S from "./FindIdPageStyle.js";
import axios from "axios";

function FindIdPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [userId, setUserId] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const userNameHandler = (e) => {
    setUserName(e.target.value);
  };

  const phoneNumberHandler = (e) => {
    setphoneNumber(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      if (userName === "" || phoneNumber === "") {
        alert("이름 또는 핸드폰번호를 입력해주세요.");
      } else {
        handleFindId();
      }
    }
  };

  const handleFindId = async () => {
    const data = {
      userName: userName,
      phoneNumber: phoneNumber,
    };
    try {
      const res = await axios.post("/api/findId", data);
      if (res.data.result === false) {
        // 일치하는 정보가 없을 때
        setNotFound(true);
      } else {
        // 일치하는 정보가 있을 때
        setUserId(res.data.userId); // 아이디 값을 상태에 저장
        setNotFound(false);
      }
    } catch (error) {
      console.log("아이디 찾기", error);
    }
  };

  const handleLoginPage = () => {
    navigate("/login");
  };

  const handleFindPwPage = () => {
    navigate("/findPw");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <Navbar />
      <section>
        <S.FormBox>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            onKeyDown={handleEnter}
          >
            <S.FindIdHead>아이디 찾기</S.FindIdHead>
            <br />
            <S.Input
              type="text"
              onChange={userNameHandler}
              placeholder="이름"
            />
            <br />
            <S.Input
              type="password"
              onChange={phoneNumberHandler}
              placeholder="휴대폰 번호"
            />
            <br />
            <S.Button onClick={handleFindId}>아이디 찾기</S.Button>
            <br />
            <S.ButtonContainer>
              <S.ButtonGroup>
                <S.ButtonSecond onClick={handleLoginPage}>
                  로그인
                </S.ButtonSecond>
                <S.ButtonSecond onClick={handleFindPwPage}>
                  비밀번호 찾기
                </S.ButtonSecond>
                <S.ButtonSecond onClick={handleRegister}>
                  회원가입
                </S.ButtonSecond>
              </S.ButtonGroup>
            </S.ButtonContainer>
            {userId && (
              <S.UserIdDisplay>
                회원님의 아이디는 {userId} 입니다.
              </S.UserIdDisplay>
            )}
            {notFound && (
              <S.UserIdDisplay>일치하는 정보가 없습니다.</S.UserIdDisplay>
            )}
          </form>
        </S.FormBox>
      </section>
      <Footer />
    </>
  );
}

export default FindIdPage;
