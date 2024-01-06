import * as S from "./LoginGoogleStyle.js";
import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URL = process.env.REACT_APP_GOOGLE_CALLBACK;
export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URL}`;

export default function LoginGoogle() {
  const location = useLocation();

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    console.log("authorizationCode", authorizationCode);

    if (authorizationCode) {
      axios
        .post("http://localhost:8001/api/login/google/callback", {
          authorizationCode,
        })
        .then((res) => {
          console.log("res 결과", res);
          localStorage.setItem("jwtAccessToken", res.data.accessToken);
        })
        .catch((err) => console.error(err));
    }
  }, [location]);

  return (
    <>
      <a href={GOOGLE_AUTH_URL}>
        <S.LoginGoogleStyle></S.LoginGoogleStyle>
      </a>
    </>
  );
}
