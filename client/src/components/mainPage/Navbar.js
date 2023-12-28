import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import logo from "../../assets/img/theWave.png";
import search from "../../assets/img/search.png";
import menu from "../../assets/img/menu.png";
import basket from "../../assets/img/basket.png";
import mypage from "../../assets/img/mypage.png";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../redux/reducers/userSlice";
import getAccessToken from "../../hooks/getAcessToken";
import axios from "axios";

function Navbar() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const headers = getAccessToken();

    try {
      const res = await axios.get("http://localhost:8000/logout", { headers });
      if (res.data) {
        dispatch(resetUser());
        localStorage.removeItem("accessToken");
      } else {
        alert("로그아웃 실패 ");
      }
    } catch (error) {
      console.log("에러요", error);
    }
  };

  const [screenSize, setScreenSize] = useState(window.innerWidth <= 582);
  const [isMenuVisible, setMenuVisible] = useState(false);

  const user = useSelector((state) => state.user);
  const isLogin = getAccessToken() ? true : false;
  // console.log(isLogin);
  // console.log(user.user);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth <= 582);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseEnter = () => {
    setMenuVisible(true);
  };

  const handleMouseLeave = () => {
    // 굳이 필요 없음
    setMenuVisible(false);
  };

  const handleMouseContainer = () => {
    setMenuVisible(false);
  };

  return (
    <>
      <header>
        {/* searchbar */}
        <div className="logoBar">
          <div>
            <a>{screenSize ? <img src={menu} /> : <img src={search} />}</a>
          </div>
          <div>
            <a>
              <Link to={"/"}>
                <img src={logo} />
              </Link>
            </a>
          </div>
          <div>
            <div onMouseLeave={handleMouseContainer}>
              <a
                onMouseEnter={handleMouseEnter}
                style={{ marginRight: "10px" }}
              >
                <img src={mypage} />
              </a>
              {isMenuVisible &&
                (isLogin ? (
                  <div className="myPageMenu">
                    <div>
                      <a className="menuItem" onClick={handleLogout}>
                        <Link to="#">Logout</Link>
                      </a>
                    </div>
                    <div>
                      <a className="menuItem">
                        <Link to="/mypage">MyPage</Link>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="myPageMenu">
                    <div>
                      <a className="menuItem">
                        <Link to="/login">login</Link>
                      </a>
                    </div>
                    <div>
                      <a className="menuItem">
                        <Link to="/register">SignUp</Link>
                      </a>
                    </div>
                  </div>
                ))}
            </div>
            <div>
              <a>
                <Link to="/cart">
                  <img src={basket} />
                </Link>
              </a>
            </div>
          </div>
        </div>

        {/* navbar */}
        {screenSize ? null : (
          <nav>
            <ul>
              <li>
                <a href="#" style={{ fontWeight: "bold" }}>
                  All Products
                </a>
              </li>
              <li>
                <Link to={`/category`}>
                  <a href="#">Best</a>
                </Link>
              </li>
              <li>
                <Link to={`/category`}>
                  <a href="#">캐릭터</a>
                </Link>
              </li>
              <li>
                <Link to={`/category`}>
                  <a href="#">데이지</a>
                </Link>
              </li>
              <li>
                <Link to={`/category`}>
                  <a href="#">레터링</a>
                </Link>
              </li>
              <li>
                <Link to={`/category`}>
                  <a href="#">용돈</a>
                </Link>
              </li>
              <li>
                <Link to={`/category`}>
                  <a href="#">옴브레</a>
                </Link>
              </li>
              <li>
                <Link to={`/category`}>
                  <a href="#">장미</a>
                </Link>
              </li>
              <li>
                <Link to={`/category`}>
                  <a href="#">튤립</a>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}

export default Navbar;
