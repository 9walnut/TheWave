import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MainPage.css";
import Button from "../components/register/Button";
import PageName from "../components/register/PageName";
import PageInput from "../components/register/PageInput";

function Register() {
  return (
    <>
      <Navbar />

      <section>
        <div className="formBox">
          <PageName>Register</PageName>
          <PageInput type={"text"}>아이디</PageInput>
          <PageInput type={"password"}>비밀번호</PageInput>
          <PageInput type={"password"}>비밀번호 확인</PageInput>
          <PageInput type={"text"}>이름</PageInput>
          <PageInput type={"text"} placeholder={"000-0000-0000"}>
            연락처
          </PageInput>
          <PageInput type={"text"} placeholder={"YYYY-MM-DD"}>
            생일
          </PageInput>
          <PageInput type={"text"}>성별</PageInput>
          <PageInput type={"text"}>주소</PageInput>
          <Button link={"/signUp"}>회원가입</Button>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Register;
