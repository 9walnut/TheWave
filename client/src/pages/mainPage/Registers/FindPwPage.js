import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/mainPage/Navbar";
import Footer from "../../../components/mainPage/Footer";
import "../MainPage.css";
import * as S from "./FindPwPageStyle.js";
import axios from "axios";
import Swal from "sweetalert2";

function FindPwPage() {
  const [userId, setUserId] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [pwResult, setPwResult] = useState(false);
  const [password, setPassword] = useState("");
  const [validText, setValidText] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const userIdHandler = (e) => {
    setUserId(e.target.value);
  };

  const phoneNumberHandler = (e) => {
    setphoneNumber(e.target.value);
  };

  useEffect(() => {
    pwCheck();
  }, [password, checkPassword]);
  const pwCheck = () => {
    if (password === "" || checkPassword === "") {
      setValidText("비밀번호를 입력해주세요");
    } else if (password === checkPassword) {
      setValidText("비밀번호가 일치합니다");
    } else if (!(password === checkPassword)) {
      setValidText("비밀번호가 일치하지 않습니다");
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      if (userId === "" || phoneNumber === "") {
        Swal.fire({
          icon: "warning",
          title: "이름 혹은 휴대폰 번호를 입력해주세요",
          confirmButtonColor: "#5a5a5a",
        });
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
        setNotFound(false);
        setPwResult(true);
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

  const modifyPw = async () => {
    if (password === checkPassword) {
      try {
        const data = {
          userId: userId,
          password: password,
        };

        const res = await axios.post("/api/findPw/newPw", data);
        if (res.data.result == true) {
          Swal.fire({
            icon: "success",
            title: "비밀번호가 변경되었습니다.",
            confirmButtonColor: "#5a5a5a", // 버튼 색상
          });
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Navbar />
      <section>
        <S.FormBox>
          {!pwResult && (
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
          )}
          {pwResult && (
            <>
              <S.FormBox>
                <form>
                  <S.FindPwHead>비밀번호 재설정</S.FindPwHead>
                  <S.DisabledInput type="text" value={userId} disabled />
                  <br />
                  <S.Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                  />
                  <br />
                  <S.Input
                    type="password"
                    value={checkPassword}
                    onChange={(e) => setCheckPassword(e.target.value)}
                    placeholder="비밀번호 확인"
                  />
                  <S.ValidTextBox>{validText}</S.ValidTextBox>
                  <S.Button onClick={modifyPw}>비밀번호 재설정</S.Button>
                </form>
              </S.FormBox>
            </>
          )}
        </S.FormBox>
      </section>
      <Footer />
    </>
  );
}

export default FindPwPage;
