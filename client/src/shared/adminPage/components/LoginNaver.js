import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/reducers/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import React, { useEffect } from "react";
import NaverLogin from "react-naver-login";
import styled from "styled-components";
import Bg from "../../../assets/img/naverlogin.png";

// const StyledNaverLogin = styled.div`
//   background-image: url(${Bg});
//   background-repeat: no-repeat;
//   background-size: cover;
//   margin: 10px auto;
//   color: transparent;
//   width: 300px;
//   height: 60px;
//   cursor: pointer;
// `;

const naverClientId = process.env.REACT_APP_NAVER_ID;
const REDIRECT_URI = "http://localhost:3000/login";

const LoginNaver = () => {
  const { naver } = window;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: naverClientId,
      callbackUrl: REDIRECT_URI,
      isPopup: false,
      loginButton: { color: "green", type: 3, height: "60" },
    });
    naverLogin.init();

    try {
      naverLogin.getLoginStatus(async (status) => {
        if (status) {
          const userData = naverLogin.user;

          const response = await axios.post("/api/snsLogin", {
            data: userData,
            provider: "naver",
          });

          const result = response.data.result;

          const { isAdmin, accessToken } = response.data;
          if (result === true) {
            const user = { isAdmin, accessToken };
            dispatch(setUser(user));

            localStorage.setItem("accessToken", user.accessToken);

            if (isAdmin === "Y") {
              navigate("/admin");
            } else {
              navigate("/");
            }
          } else {
            console.error("Login failed");
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return (
    <>
      <div id="naverIdLogin" />
    </>
  );
};

export default LoginNaver;
