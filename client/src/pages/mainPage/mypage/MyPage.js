import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../components/mainPage/Navbar";
import Footer from "../../../components/mainPage/Footer";
import "../MainPage.css";
import * as S from "../../../styles/mainPage/mypage.style";
import getAccessToken from "../../../hooks/getAcessToken";
import MyPageInfo from "./MyPageInfo";
import WishList from "./WishList";
import MyPageMain from "./MyPageMain";
import DeliveryStatus from "./DeliveryStatus";

function MyPage() {
  const navigate = useNavigate();
  const { isAdmin, accessToken } = useSelector((state) => state.user);
  const [orderList, setOrderList] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        console.log("try중입니다");

        const headers = getAccessToken();
        const res = await axios.get("/api/mypage", {
          headers,
        });
        if (res.data.orderList) {
          console.log("mypage: ", res.data);
          setOrderList(res.data.orderList);
          setUserName(res.data.userInfo.userName);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <section>
        <S.MypageTitle>
          <Link to="/mypage">마이 페이지</Link>
        </S.MypageTitle>
        <S.InfoBox>환영합니다. {userName} 님 !</S.InfoBox>
        <S.MypageLayout>
          <S.SideMenu>
            <div>
              <Link to="/mypage">mypage</Link>
            </div>
            <ul>
              <li>
                <Link to="main">배송 현황</Link>
              </li>
              <li>
                <Link to="/cart">
                  <a>장바구니</a>
                </Link>
              </li>
              <li>
                <Link to="wishList">
                  <a>찜한 상품</a>
                </Link>
              </li>
              <li>
                <Link to="info">
                  <a>내 정보 수정</a>
                </Link>
              </li>
              <li>
                <Link to="info">
                  <a>회원 탈퇴</a>
                </Link>
              </li>
            </ul>
          </S.SideMenu>
          <S.MypageContent>
            <Routes>
              <Route path="/" element={<MyPageMain />} />
              <Route path="delivery" element={<DeliveryStatus />} />
              <Route path="info" element={<MyPageInfo />} />
              <Route path="wishlist" element={<WishList />} />
            </Routes>
          </S.MypageContent>
        </S.MypageLayout>
      </section>
      <Footer />
    </>
  );
}

export default MyPage;
