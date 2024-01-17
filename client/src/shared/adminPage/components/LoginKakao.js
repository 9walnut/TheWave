import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/reducers/userSlice";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import React, { useEffect } from "react";
import KakaoLogin from "react-kakao-login";
import styled from "styled-components";
import Bg from "../../../assets/img/kakaologin.png";

const StyledkakaoLogin = styled.div`
  background-image: url(${Bg});
  background-repeat: no-repeat;
  background-size: cover;
  margin: 10px auto;
  color: transparent;
  width: 300px;
  height: 60px;
  cursor: pointer;
`;

export default function LoginKakao() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const kakaoClientId = process.env.REACT_APP_KAKAO_JS;
  const kakaoOnSuccess = async (data) => {
    const response = await axios.post("/api/snsLogin", {
      data,
      provider: "kakao",
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
  };
  const kakaoOnFailure = (error) => {
    console.log(error);
  };

  return (
    <KakaoLogin
      token={kakaoClientId}
      onSuccess={(res) => {
        kakaoOnSuccess(res);
      }}
      onFail={kakaoOnFailure}
      render={({ onClick }) => <StyledkakaoLogin onClick={onClick} />}
    />
  );
}
