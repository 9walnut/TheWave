function getAccessToken() {
  if (localStorage.getItem("accessToken")) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
    return headers;
  } else {
    return false;
  }
}
export default getAccessToken;
