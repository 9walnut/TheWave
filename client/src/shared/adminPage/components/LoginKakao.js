import * as S from "./LoginKakaoStyle.js";
import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const KAKAO_ID = process.env.KAKAO_ID; //REST API KEY
const KAKAO_URL = process.env.KAKAO_URL; //Redirect URI
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_ID}&redirect_uri=${KAKAO_URL}&response_type=code`;

export default function LoginKakao() {
  // oauth 요청 URL
  const location = useLocation();

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");

    if (authorizationCode) {
      axios
        .post("http://localhost:3000/login/kakao/callback", {
          authorizationCode,
        })
        .then((res) => console.log(res))
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
