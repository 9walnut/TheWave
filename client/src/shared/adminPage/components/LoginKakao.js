import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/reducers/userSlice";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import React, { useEffect, useState } from "react";
import KakaoLogin from "react-kakao-login";
import styled from "styled-components";
import Bg from "../../../assets/img/kakaologin.png";

const StyledKakaoLogin = styled.div`
  background-image: url(${Bg});
  background-repeat: no-repeat;
  background-size: cover;
  margin: 10px auto;
  color: transparent;
  width: 300px;
  height: 60px;
  cursor: pointer;
`;

export default function LoginKakao() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const kakaoClientId = process.env.REACT_APP_KAKAO_JS;
  const kakaoOnSuccess = async (data) => {
    console.log("카카오 로그인 성공 res", data);
    // const idToken = data.response.access_token; // 엑세스 토큰 백엔드로 전달

    // 서버에 사용자 정보 전달
    const response = await axios.post("/api/snsLogin", { data });

    // 서버로부터 응답 받기
    const result = response.data.result;
    console.log("response.data", response.data);

    const { isAdmin, accessToken } = response.data;
    // 응답 처리 로직
    if (result === true) {
      const user = { isAdmin, accessToken };
      // 사용자 정보를 리덕스 스토어에 저장
      dispatch(setUser(user));

      localStorage.setItem("accessToken", user.accessToken);
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };

      if (isAdmin === "Y") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      // 로그인 실패 처리
      console.error("Login failed:");
    }
  };
  const kakaoOnFailure = (error) => {
    console.log(error);
  };

  return (
    <KakaoLogin
      token={kakaoClientId}
      onSuccess={(res) => {
        kakaoOnSuccess(res);
      }}
      onFail={kakaoOnFailure}
      render={({ onClick }) => <StyledKakaoLogin onClick={onClick} />}
    />
  );
}
