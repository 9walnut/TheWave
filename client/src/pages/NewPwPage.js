import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MainPage.css";
import Button from "../components/register/Button";
import PageName from "../components/register/PageName";
import PageInput from "../components/register/PageInput";

function newPwPage() {
  return (
    <>
      <Navbar />
      <section>
        <div className="formBox">
          <PageName>비밀번호 찾기</PageName>
          <PageInput type={"password"} placeholder={"비밀번호"}>
            새로운 비밀번호 입력
          </PageInput>
          <PageInput type={"password"} placeholder={"비밀번호 확인"}>
            비밀번호 확인
          </PageInput>
          <Button>비밀번호 변경 완료</Button>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default newPwPage;
