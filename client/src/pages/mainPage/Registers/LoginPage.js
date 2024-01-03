import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/mainPage/Navbar";
import Footer from "../../../components/mainPage/Footer";
import LoginKakao from "../../../shared/adminPage/components/LoginKakao";
import axios from "axios";
import "../MainPage.css";

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
    if (e.key === "Enter") {
      if (userId === "" || password === "") {
        alert("아이디 또는 패스워드를 입력해주세요.");
      } else {
        // alert("엔터");
        handleLogin();
      }
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

  return (
    <>
      <Navbar />
      <section>
        <div className="formBox">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            onKeyDown={handleEnter}
          >
            ID
            <input type="text" onChange={onUserIdHandler} />
            <br />
            PW
            <input type="password" onChange={onPasswordHandler} />
            <button onClick={handleLogin}>로그인</button>
            <LoginKakao />
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default LoginPage;
