import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MainPage.css";
import Button from "../components/register/Button";
import PageName from "../components/register/PageName";
import PageInput from "../components/register/PageInput";

function FindPwPage() {
  return (
    <>
      <Navbar />
      <section>
        <div className="formBox">
          <PageName>비밀번호 찾기</PageName>
          <PageInput type={"text"} placeholder={"아이디를 입력해주세요"}>
            아이디
          </PageInput>
          <PageInput type={"text"} placeholder={"핸드폰 번호를 입력해주세요"}>
            핸드폰 번호
          </PageInput>
          <Link to={"/findPw/newPw"}>
            <Button>비밀번호 찾기</Button>
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default FindPwPage;
