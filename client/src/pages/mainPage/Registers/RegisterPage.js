import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../../components/mainPage/Navbar";
import Footer from "../../../components/mainPage/Footer";
import "../MainPage.css";
import axios from "axios";
import AddressSearch from "../../../components/AddressSearch";
import * as S from "./RegisterPageStyle.js";
import Swal from "sweetalert2";

function Register() {
  const [isUseId, setIsUseId] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthDay] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [validText, setValidText] = useState("");
  const navigate = useNavigate();

  const getAddress = (addressData) => {
    // console.log("address데이타입니다다다다", addressData);
    const newAddress = `${addressData.selectAddress}/${addressData.postNumber}/${addressData.detailAddress}`;
    setAddress(newAddress);
  };

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      onSubmit();
    }
  };

  // 아이디 중복 확인
  const idCheck = async () => {
    if (userId == "") {
      Swal.fire({
        icon: "warning",
        title: "아이디를 입력해주세요",
        confirmButtonColor: "#5a5a5a", // 버튼 색상
      });
    } else {
      try {
        const res = await axios.post("/api/register/idCheck", { userId });
        if (res.data.result == true) {
          Swal.fire({
            icon: "success",
            title: "사용 가능한 아이디입니다.",
            html: "사용하시겠습니까 ?",
            confirmButtonColor: "#5a5a5a",
            showCancelButton: true,
            confirmButtonText: "예",
            cancelButtonText: "아니오",
          }).then((result) => {
            if (result.isConfirmed) {
              setIsUseId(true);
            }
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: "중복된 아이디입니다.",
            confirmButtonColor: "#5a5a5a", // 버튼 색상
          });
        }
      } catch (error) {
        console.log("중복확인 에러", error);
      }
    }
  };

  // 회원가입
  const onSubmit = async () => {
    const data = {
      userId: userId,
      userName: userName,
      password: password,
      phoneNumber: phoneNumber,
      birthday: birthday,
      gender: gender,
      address: address,
    };
    try {
      const res = await axios.post("/api/register", { data });

      if (res.data.result) {
        Swal.fire({
          icon: "success",
          title: "회원가입 완료.",
        });
        navigate("/login");
      } else {
        alert("에러");
      }
    } catch (error) {
      console.error("Signup Failed:", error);
    }
  };

  useEffect(() => {
    pwCheck();
  }, [password, checkPassword]);
  const pwCheck = () => {
    if (password == "" || checkPassword == "") {
      setValidText("비밀번호를 입력해주세요");
    } else if (password === checkPassword) {
      setValidText("비밀번호가 일치합니다");
    } else if (!(password === checkPassword)) {
      setValidText("비밀번호가 일치하지 않습니다");
    }
  };

  return (
    <>
      <Navbar />
      <section>
        <S.FormBox>
          <S.FindRegisterHead>회원가입</S.FindRegisterHead>
          <br />
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            onKeyDown={handleEnter}
          >
            <label style={{ position: "relative" }}>
              {/* 아이디: */}
              {isUseId ? (
                <S.DisabledInput value={userId} disabled />
              ) : (
                <S.Input
                  placeholder="아이디"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              )}

              <S.IdCheckButton
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                onClick={idCheck}
                disabled={isUseId}
              >
                중복 확인
              </S.IdCheckButton>
            </label>
            <br />
            <label>
              {/* 비밀번호: */}
              <S.Input
                placeholder="비밀번호"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <S.Input
                placeholder="비밀번호 확인"
                type="password"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
              />
              <S.ValidTextBox>{validText}</S.ValidTextBox>
            </label>
            <label>
              {/* 이름: */}
              <S.Input
                placeholder="이름"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>
            <br />
            <label>
              {/* 전화번호: */}
              <S.Input
                placeholder="전화번호 ( - 제외 )"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </label>
            <br />
            <label>
              {/* 생년월일: */}
              <S.Input
                placeholder="생년월일 (YYYYMMDD) 8자리"
                pattern="[0-9]{8}"
                title="'yyyymmdd'와 같은 8자리 숫자"
                value={birthday}
                onChange={(e) => setBirthDay(e.target.value)}
              />
            </label>
            <br />
            <label>
              {/* 성별: */}
              <S.select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <S.Option value="">성별</S.Option>
                <S.Option value="M">남성</S.Option>
                <S.Option value="F">여성</S.Option>
              </S.select>
            </label>
            <br />
            <label>
              <AddressSearch
                getAddress={getAddress}
                placeholder="주소"
                value={address}
              />
            </label>
            <br />
            <S.Button type="button" onClick={onSubmit} disabled={!isUseId}>
              가입하기
            </S.Button>
          </form>
        </S.FormBox>
      </section>
      <Footer />
    </>
  );
}

export default Register;
