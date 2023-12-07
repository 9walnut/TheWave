import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MainPage.css";
import Button from "../components/register/Button";
import PageName from "../components/register/PageName";
import PageInput from "../components/register/PageInput";

function LoginPage() {
  return (
    <>
      <Navbar />

      <section>
        <div className="formBox">
          <PageName>Login</PageName>
          <PageInput
            type={"text"}
            placeholder={"아이디를 입력해주세요"}
          ></PageInput>
          <PageInput
            type={"password"}
            placeholder={"비밀번호를 입력해주세요"}
          ></PageInput>
          <Button link={"/login"}>로그인</Button>
          <Link to={"/register"}>
            <Button>회원가입</Button>
          </Link>
          <div style={{ color: "#808080", marginTop: "10px" }}>
            <Link to={"/findId"} style={{ marginRight: "15px" }}>
              아이디 찾기
            </Link>
            <Link to={"/findPw"}>비밀번호 찾기</Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default LoginPage;
