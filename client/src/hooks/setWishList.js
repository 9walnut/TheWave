import axios from "axios";
import getAccessToken from "./getAcessToken";
import { useParams } from "react-router";
import { useState } from "react";
function setWishList() {
  const { productId } = useParams();
  const [wish, setWish] = useState(false);

  const getWish = async () => {
    try {
      const headers = getAccessToken();
      const res = await axios.get(`/api/wish/${productId}`, { headers });
      if (res.data.result == true) {
        setWish(true);
      } else {
        console.log("위시에러");
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export default setWishList;
