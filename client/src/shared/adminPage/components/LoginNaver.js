import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import NaverLogin from "react-naver-login";
import styled from "styled-components";
import Bg from "../../../assets/img/naverlogin.png";

const StyledNaverLogin = styled.div`
  background-image: url(${Bg});
  background-repeat: no-repeat;
  background-size: cover;
  margin: 10px auto;
  color: transparent;
  width: 300px;
  height: 60px;
  cursor: pointer;
`;

export default function LoginNaver() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const naverClientId = process.env.REACT_APP_NAVER_ID;
  const REDIRECT_URI = "http://localhost:3000/login";
  const REACT_APP_NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&state=${Math.random()
    .toString(36)
    .substring(3, 14)}&redirect_uri=${REDIRECT_URI}`;

  const naverOnSuccess = async (data) => {
    console.log("네이버에서 넘어오는 데이터", data);

    const response = await axios.post("/api/snsLogin", { data });

    const result = response.data.result;
    console.log("response.data", response.data);

    const { isAdmin, accessToken } = response.data;
    if (result === true) {
      const user = { isAdmin, accessToken };
      dispatch(setUser(user));

      localStorage.setItem("accessToken", user.accessToken);
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };

      if (isAdmin === "Y") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      console.error("Login failed");
    }
  };
  const naverOnFailure = (error) => {
    console.log(error);
  };

  return (
    <NaverLogin
      onSuccess={(res) => naverOnSuccess(res)}
      onFailure={naverOnFailure}
      render={({ onClick }) => (
        <StyledNaverLogin
          onClick={() => {
            onClick();
            window.location.href = REACT_APP_NAVER_AUTH_URL;
          }}
        />
      )}
    />
  );
}
