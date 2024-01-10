import * as S from "./LoginGoogleStyle.js";
import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
// const GOOGLE_REDIRECT_URL = process.env.REACT_APP_GOOGLE_CALLBACK;
// export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URL}`;

export default function LoginGoogle() {
  const fetchToken = async () => {
    const token = {};
    try {
      const res = await axios.post("api/snsLogin", token);
      console.log("res 결과", res);
      localStorage.setItem("accessToken", res.data.accessToken);
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
      console.log(headers);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={(res) => {
            console.log(res);
          }}
          onFailure={(error) => {
            console.log(error);
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
}

// export default function LoginGoogle() {
//   const location = useLocation();

//   useEffect(() => {
//     const url = new URL(window.location.href);
//     const authorizationCode = url.searchParams.get("code");
//     console.log("authorizationCode", authorizationCode);

//     const fetchToken = async () => {
//       if (authorizationCode) {
//         try {
//           const res = await axios.get(
//             `${GOOGLE_REDIRECT_URL}?code=${authorizationCode}`
//           );
//           console.log("res 결과", res);
//           localStorage.setItem("accessToken", res.data.accessToken);
//           const headers = {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           };
//           console.log(headers);
//         } catch (err) {
//           console.error(err);
//         }
//       }
//     };

//     fetchToken();
//   }, [location]);

//   return (
//     <>
//       <a href={GOOGLE_AUTH_URL}>
//         <S.LoginGoogleStyle></S.LoginGoogleStyle>
//       </a>
//     </>
//   );
// }
