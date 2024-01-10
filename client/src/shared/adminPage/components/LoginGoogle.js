import React, { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/reducers/userSlice";

import styled from "styled-components";
import Bg from "../../../assets/img/googlelogin.png";

const StyledGoogleLogin = styled.div`
  background-image: url(${Bg});
  background-repeat: no-repeat;
  background-size: cover;
  margin: 10px auto;
  color: transparent;
  width: 300px;
  height: 60px;
  cursor: pointer;
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
        <GoogleLogin
          onSuccess={(res) => {
            googleOnSuccess(res);
          }}
          onFailure={(error) => {
            console.log(error);
          }}
          render={({ onClick }) => <StyledGoogleLogin onClick={onClick} />}
        />
      </GoogleOAuthProvider>
    </>
  );
}
