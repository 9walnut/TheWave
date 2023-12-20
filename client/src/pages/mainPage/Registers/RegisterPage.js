import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../../components/mainPage/Navbar";
import Footer from "../../../components/mainPage/Footer";
import "../MainPage.css";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/register", data);
      console.log("Signup Successful:", res.data.result);
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
        <div className="formBox">
          <h4>react form 페이지</h4>
          {/* handleSubmit(onValid[, onInvaild]) */}
          {/* onVaild : 폼을 정상적으로 제출할 수 있는 상태일 떄, 실행시킬 수 있는 함수 */}
          {/* onInvalid : (선택값) 폼을 정상적으로 제출할 수 있는 상태일 때, 실행시킬 함수 */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              아이디:
              <input
                {...register("userId", { required: "아이디를 입력하세요" })}
              />
              {errors.userId && <p>{errors.userId.message}</p>}
            </label>
            <br />
            <label>
              비밀번호:
              <input
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
              이름:
              <input
                {...register("userName", { required: "이름을 입력하세요" })}
              />
              {errors.userName && <p>{errors.userName.message}</p>}
            </label>
            <br />
            <label>
              전화번호:
              <input
                {...register("phoneNumber", {
                  required: "전화번호를 입력하세요",
                })}
              />
              {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
            </label>
            <br />
            <label>
              생년월일:
              <input
                {...register("birthday", { required: "생년월일을 입력하세요" })}
              />
              {errors.birthday && <p>{errors.birthday.message}</p>}
            </label>
            <br />
            <label>
              성별:
              <select
                {...register("gender", { required: "성별을 선택하세요" })}
              >
                <option value="M">남성</option>
                <option value="F">여성</option>
              </select>
              {errors.gender && <p>{errors.gender.message}</p>}
            </label>
            <br />
            <label>
              주소:
              <input
                {...register("address", { required: "주소를 입력하세요" })}
              />
              {errors.address && <p>{errors.address.message}</p>}
            </label>

            <br />
            <button type="submit">가입하기</button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Register;
