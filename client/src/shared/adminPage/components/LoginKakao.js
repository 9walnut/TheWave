import * as S from "./LoginKakaoStyle.js";
import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const KAKAO_ID = process.env.REACT_APP_KAKAO_ID; //REST API KEY
const KAKAO_URL = process.env.REACT_APP_KAKAO_URL; //Redirect URI
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_ID}&redirect_uri=${KAKAO_URL}&response_type=code`;

export default function LoginKakao() {
  // oauth 요청 URL
  const location = useLocation();

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");

    if (authorizationCode) {
      axios
        .post("http://localhost:8001/api/login/kakao/callback", {
          authorizationCode,
        })
        .then((res) => {
          console.log(res); // 응답 확인
          // 서버로부터 받은 토큰을 저장
          localStorage.setItem("jwtAccessToken", res.data.accessToken);
          localStorage.setItem("jwtRefreshToken", res.data.refreshToken);

          // 사용자가 처음 로그인한 경우 추가 처리
          if (res.data.firstLogin) {
          }
        })
        .catch((err) => console.log(err));
    }
  }, [location]);

  return (
    <>
      <a href={KAKAO_AUTH_URL}>
        <S.LoginKakaoStyle></S.LoginKakaoStyle>
      </a>
    </>
  );
}
