import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/mainPage/Navbar";
import Footer from "../../../components/mainPage/Footer";
import LoginKakao from "../../../shared/adminPage/components/LoginKakao";
import LoginNaver from "../../../shared/adminPage/components/LoginNaver";
import LoginGoogle from "../../../shared/adminPage/components/LoginGoogle";
import axios from "axios";
import "../MainPage.css";
import * as S from "./LoginPageStyle.js";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const onUserIdHandler = (e) => {
    setUserId(e.target.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    const data = {
      userId: userId,
      password: password,
    };
    try {
      const res = await axios.post("api/login", data);
      if (res.data.result) {
        localStorage.setItem("accessToken", res.data.accessToken);
        const headers = {
          Authorization: `${localStorage.getItem("accessToken")}`,
        };
        console.log("토큰값입니다", headers);
        const { isAdmin, accessToken } = res.data;
        console.log(res.data);
        const user = {
          accessToken,
          isAdmin,
        };

        dispatch(setUser(user));

        if (isAdmin === "Y") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        console.log("로그인 실패");
      }
    } catch (error) {
      // 에러 처리
      console.log("에러에러", error);
    }
  };

  const handleFindId = () => {
    navigate("/findId");
  };

  const handleFindPw = () => {
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
            <S.LoginHead>로그인</S.LoginHead>
            <br />
            <S.Input
              type="text"
              onChange={onUserIdHandler}
              placeholder="아이디"
            ></S.Input>
            <br />
            <S.Input
              type="password"
              onChange={onPasswordHandler}
              placeholder="비밀번호"
            />
            <br />
            <S.Button onClick={handleLogin}>로그인</S.Button>
            <br />
            <S.ButtonContainer>
              <S.ButtonGroup>
                <S.FindButton onClick={handleFindId}>아이디 찾기</S.FindButton>
                <S.FindButton onClick={handleFindPw}>
                  비밀번호 찾기
                </S.FindButton>
              </S.ButtonGroup>
              <S.RegisterGroup>
                <S.RegisterButton onClick={handleRegister}>
                  회원가입
                </S.RegisterButton>
              </S.RegisterGroup>
            </S.ButtonContainer>
            <br />
            소셜 로그인
            <LoginKakao />
            <LoginNaver />
            <LoginGoogle />
            <br />
          </form>
        </S.FormBox>
      </section>
      <Footer />
    </>
  );
}

export default LoginPage;
