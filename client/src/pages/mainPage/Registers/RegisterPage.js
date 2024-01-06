import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../../components/mainPage/Navbar";
import Footer from "../../../components/mainPage/Footer";
import "../MainPage.css";
import axios from "axios";
import AddressSearch from "../../../components/AddressSearch";
import * as S from "./RegisterPageStyle.js";

function Register() {
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const {
    register,
    // setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getAddress = (addressData) => {
    console.log("address데이타입니다다다다", addressData);
    const newAddress = `${addressData.selectAddress} ${addressData.postNumber} ${addressData.detailAddress}`;
    console.log("newAddress입니다.", newAddress);
    setAddress(newAddress);
    // return newAddress;
  };

  const onSubmit = async (data) => {
    console.log("주소", address);
    console.log(data);
    try {
      const res = await axios.post("api/register", data);
      console.log("Signup Successful:", res);
      if (res.data.result) {
        alert("회원가입 성공 ~~");
        navigate("/login");
      } else {
        alert("에러");
      }
    } catch (error) {
      console.error("Signup Failed:", error.res.data);
    }
  };

  return (
    <>
      <Navbar />
      <section>
        <S.FormBox>
          <S.FindRegisterHead>회원가입</S.FindRegisterHead>
          <br></br>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              {/* 아이디: */}
              <S.Input
                placeholder="아이디"
                {...register("userId", { required: "아이디를 입력하세요" })}
              />
              {errors.userId && <p>{errors.userId.message}</p>}
            </label>
            <br />
            <label>
              {/* 비밀번호: */}
              <S.Input
                placeholder="패스워드"
                {...register("password", {
                  required: "비밀번호를 입력하세요",
                  minLength: 6,
                })}
                type="password"
              />
              {errors.password && <p>{errors.password.message}</p>}
            </label>
            <br />
            <label>
              {/* 이름: */}
              <S.Input
                placeholder="이름"
                {...register("userName", { required: "이름을 입력하세요" })}
              />
              {errors.userName && <p>{errors.userName.message}</p>}
            </label>
            <br />
            <label>
              {/* 전화번호: */}
              <S.Input
                placeholder="전화번호"
                {...register("phoneNumber", {
                  required: "전화번호를 입력하세요",
                })}
              />
              {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
            </label>
            <br />
            <label>
              {/* 생년월일: */}
              <S.Input
                placeholder="생년월일"
                {...register("birthday", { required: "생년월일을 입력하세요" })}
              />
              {errors.birthday && <p>{errors.birthday.message}</p>}
            </label>
            <br />
            <label>
              {/* 성별: */}
              <S.select
                {...register("gender", { required: "성별을 선택하세요" })}
              >
                <S.Option value="">성별</S.Option>
                <S.Option value="M">남성</S.Option>
                <S.Option value="F">여성</S.Option>
              </S.select>
              {errors.gender && <p>{errors.gender.message}</p>}
            </label>
            <br />
            <label>
              <AddressSearch
                getAddress={getAddress}
                register={register}
                placeholder="주소"
                value={address}
              />
              {errors.address && <p>{errors.address.message}</p>}
            </label>

            <br />
            <S.Button type="submit">가입하기</S.Button>
          </form>
        </S.FormBox>
      </section>
      <Footer />
    </>
  );
}

export default Register;
