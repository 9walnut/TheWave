import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/mainPage/Navbar";
import Footer from "../../../components/mainPage/Footer";
import axios from "axios";
import "../MainPage.css";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const onUserIdHandler = (e) => {
    setUserId(userId);
  };

  const onPasswordHandler = (e) => {
    setPassword(password);
  };

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      if (userId == "" || password == "") {
        alert("아이디 또는 패스워드를 입력해주세요.");
      } else {
        alert("엔터");
        // login();
      }
    }
  };

  const login = () => {
    //로그인
  };

  return (
    <>
      <Navbar />
      <section>
        <div className="formBox">
          <form onKeyDown={handleEnter}>
            <input type="text" onChange={onUserIdHandler} />
            <input type="text" onChange={onPasswordHandler} />
            <button onClick={login}></button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default LoginPage;
