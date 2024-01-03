const LoginKakao = () => {
  const Rest_api_key = "a5e186173cbb917d0d627a1d982d3785"; //REST API KEY
  const redirect_uri = "http://localhost:3000/login/kakao"; //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  return (
    <>
      <button onClick={handleLogin}>카카오 로그인</button>
    </>
  );
};
export default LoginKakao;
