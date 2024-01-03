import * as S from "./LoginKakaoStyle.js";
import React from "react";

const CLIENT_ID = "a5e186173cbb917d0d627a1d982d3785"; //REST API KEY
const REDIRECT_URI = "http://localhost:3000/login/kakao/callback"; //Redirect URI
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export default function LoginKakao() {
  // oauth 요청 URL

  return (
    <>
      <a href={KAKAO_AUTH_URL}>
        <S.LoginKakaoStyle></S.LoginKakaoStyle>
      </a>
    </>
  );
}
