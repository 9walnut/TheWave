import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MainPage.css";
import Button from "../components/register/Button";
import PageName from "../components/register/PageName";
import PageInput from "../components/register/PageInput";

function FindIdPage() {
  return (
    <>
      <Navbar />
      <section>
        <div className="formBox">
          <PageName>아이디 찾기</PageName>
          <PageInput type={"text"}>이름</PageInput>
          <PageInput
            type={"text"}
            placeholder={"핸드폰 번호를 입력해주세요 ( - 제외 )"}
          >
            핸드폰 번호
          </PageInput>
          <Button>아이디 찾기</Button>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default FindIdPage;
