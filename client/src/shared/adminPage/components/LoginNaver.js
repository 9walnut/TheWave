import * as S from "./LoginNaverStyle.js";
import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const NAVER_ID = process.env.REACT_APP_NAVER_ID;
const NAVER_URL = process.env.REACT_APP_NAVER_URL;
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_ID}&state=STATE_STRING&redirect_uri=${NAVER_URL}`;

export default function LoginNaver() {
  const location = useLocation();

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");

    const fetchToken = async () => {
      if (authorizationCode) {
        try {
          const res = await axios.get(`${NAVER_URL}?code=${authorizationCode}`);

          console.log(res); // 응답 확인
          // 서버로부터 받은 토큰을 저장
          localStorage.setItem("accessToken", res.data.accessToken);
          const headers = {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          };

          console.log(headers);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchToken();
  }, [location]);

  return (
    <>
      <a href={NAVER_AUTH_URL}>
        <S.LoginNaverStyle></S.LoginNaverStyle>
      </a>
    </>
  );
}
