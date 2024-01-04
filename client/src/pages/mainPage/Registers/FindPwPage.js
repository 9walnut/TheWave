import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../../components/mainPage/Navbar";
import Footer from "../../../components/mainPage/Footer";
import "../MainPage.css";
import Button from "../../../components/register/Button";
import PageName from "../../../components/register/PageName";
import PageInput from "../../../components/register/PageInput";
import * as S from "./FindPwPageStyle.js";

function FindPwPage() {
  return (
    <>
      <Navbar />
      <section>
        <S.FormBox>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            // onKeyDown={handleEnter}
          >
            <S.FindPwHead>비밀번호 찾기</S.FindPwHead>
            <br />
            <S.Input
              type="text"
              // onChange={onUserIdHandler}
              placeholder="아이디"
            />
            <br />
            <S.Input
              type="password"
              // onChange={onPasswordHandler}
              placeholder="휴대폰 번호"
            />
            <br />
            <S.Button
            // onClick={handleLogin}
            >
              <Link to={"/findPw/newPw"}>비밀번호 찾기</Link>
            </S.Button>
          </form>
        </S.FormBox>
      </section>
      <Footer />
    </>
  );
}

export default FindPwPage;
