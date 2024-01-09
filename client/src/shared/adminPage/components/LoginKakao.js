import * as S from "./LoginKakaoStyle.js";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/reducers/userSlice";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import qs from "qs";

const KAKAO_ID = process.env.REACT_APP_KAKAO_ID; //REST API KEY
const KAKAO_URL = process.env.REACT_APP_KAKAO_URL; //Redirect URI
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_ID}&redirect_uri=${KAKAO_URL}&response_type=code`;
const KAKAO_TOKEN_URL = "https://kauth.kakao.com/oauth/token";

export default function LoginKakao() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");

    const fetchToken = async () => {
      console.log(authorizationCode);
      if (authorizationCode) {
        try {
          const res = await axios.post(
            KAKAO_TOKEN_URL,
            qs.stringify({
              grant_type: "authorization_code",
              client_id: KAKAO_ID,
              redirect_uri: KAKAO_URL,
              code: authorizationCode,
            }),
            {
              headers: {
                "Content-type":
                  "application/x-www-form-urlencoded;charset=utf-8",
              },
            }
          );

          const { access_token, refresh_token } = res.data;
          localStorage.setItem("accessToken", access_token);
          localStorage.setItem("refreshToken", refresh_token);

          const user = {
            accessToken: access_token,
            refreshToken: refresh_token,
            isAdmin: false,
          };
          console.log(user);
          dispatch(setUser(user));
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchToken();
  }, [location]);

  return (
    <>
      <a href={KAKAO_AUTH_URL}>
        <S.LoginKakaoStyle></S.LoginKakaoStyle>
      </a>
    </>
  );
}
