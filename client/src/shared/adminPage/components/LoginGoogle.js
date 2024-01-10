import React, { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/reducers/userSlice";

import styled from "styled-components";
import Bg from "../../../assets/img/googlelogin.png";

const StyledContainer = styled.div`
  position: relative;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  background-image: url(${Bg});
  background-repeat: no-repeat;
  background-size: cover;
  margin: 10px auto;
  color: transparent;
  width: 300px;
  height: 60px;
  z-index: 1000;
  cursor: pointer;
`;

const GoogleLoginWrapper = styled.div`
  position: relative;
  z-index: 100;
  bottom: 0;
  opacity: 0;
`;

export default function LoginGoogle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const googleOnSuccess = async (data) => {
    const idToken = data.credential;
    try {
      const res = await axios.post("api/snsLogin", { idToken });
      console.log("res 결과", res);

      const result = res.data;
      localStorage.setItem("accessToken", result.accessToken);
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
      const { isAdmin, accessToken } = res.data;
      console.log("headers", headers);

      const user = {
        accessToken,
        isAdmin,
      };

      dispatch(setUser(user));

      if (isAdmin === "Y") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <StyledContainer>
          <GoogleLoginWrapper>
            <GoogleLogin
              onSuccess={(res) => {
                googleOnSuccess(res);
              }}
              onFailure={(error) => {
                console.log(error);
              }}
            />
          </GoogleLoginWrapper>
        </StyledContainer>
      </GoogleOAuthProvider>
    </>
  );
}
