import * as S from "./LoginKakaoStyle.js";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/reducers/userSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import KakaoLogin from "react-kakao-login";

export default function LoginKakao() {
  const dispatch = useDispatch();
  const kakaoClientId = process.env.REACT_APP_KAKAO_ID;
  const kakaoOnSuccess = async (data) => {
    console.log(data);
    const idToken = data.response.access_token; // 엑세스 토큰 백엔드로 전달

    // 서버에 사용자 정보 전달
    const response = await axios.post("/api/snsLogin", { idToken });

    // 서버로부터 응답 받기
    const result = response.data;
    console.log("result", result);

    // 응답 처리 로직
    if (result.success) {
      // 사용자 정보를 리덕스 스토어에 저장
      dispatch(setUser(result.user));
    } else {
      // 로그인 실패 처리
      console.error("Login failed:", result.message);
    }
  };
  const kakaoOnFailure = (error) => {
    console.log(error);
  };

  return (
    <>
      <KakaoLogin
        token={kakaoClientId}
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFailure}
      />
      {/* <S.LoginKakaoStyle
        token={kakaoClientId}
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFailure}
      ></S.LoginKakaoStyle> */}
    </>
  );
}
