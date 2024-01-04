import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/mainPage/Navbar";
import Footer from "../../../components/mainPage/Footer";
import "../MainPage.css";
import * as S from "./FindPwPageStyle.js";
import axios from "axios";

function FindPwPage() {
  const [userId, setUserId] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [notFound, setNotFound] = useState(false);

  const userIdHandler = (e) => {
    setUserId(e.target.value);
  };

  const phoneNumberHandler = (e) => {
    setphoneNumber(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      if (userId === "" || phoneNumber === "") {
        alert("이름 또는 핸드폰번호를 입력해주세요.");
      } else {
        handleFindPw();
      }
    }
  };

  const handleFindPw = async () => {
    const data = {
      userId: userId,
      phoneNumber: phoneNumber,
    };
    try {
      const res = await axios.post("/api/findPw", data);
      if (res.data.result === false) {
        // 일치하는 정보가 없을 때
        setNotFound(true);
      } else {
        // 일치하는 정보가 있을 때
        setUserId(res.data.userId); // 아이디 값을 상태에 저장
        setNotFound(false);
        navigate("/findPw/newPw");
      }
    } catch (error) {
      console.log("아이디 찾기", error);
    }
  };

  const navigate = useNavigate();
  const handleLoginPage = () => {
    navigate("/login");
  };

  const handleFindIdPage = () => {
    navigate("/findId");
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
            <S.FindPwHead>비밀번호 찾기</S.FindPwHead>
            <br />
            <S.Input
              type="text"
              onChange={userIdHandler}
              placeholder="아이디"
            />
            <br />
            <S.Input
              type="password"
              onChange={phoneNumberHandler}
              placeholder="휴대폰 번호"
            />
            <br />
            <S.Button onClick={handleFindPw}>비밀번호 찾기</S.Button>
            <S.ButtonContainer>
              <S.ButtonGroup>
                <S.ButtonSecond onClick={handleLoginPage}>
                  로그인
                </S.ButtonSecond>
                <S.ButtonSecond onClick={handleFindIdPage}>
                  아이디 찾기
                </S.ButtonSecond>
                <S.ButtonSecond onClick={handleRegister}>
                  회원가입
                </S.ButtonSecond>
              </S.ButtonGroup>
            </S.ButtonContainer>
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

export default FindPwPage;
