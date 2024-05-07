import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import logo from "../../assets/img/theWave.png";
import search from "../../assets/img/search.png";
import menu from "../../assets/img/menu.png";
import basket from "../../assets/img/basket.png";
import mypage from "../../assets/img/mypage.png";
import "./Navbar.css";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../redux/reducers/userSlice";
import getAccessToken from "../../hooks/getAcessToken";
import axios from "axios";

function Navbar() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const headers = getAccessToken();

    try {
      const res = await axios.get("/api/logout", { headers });
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

  const [screenSize, setScreenSize] = useState(window.innerWidth <= 650);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [sideModal, setSideModal] = useState(false);
  const [searchBox, setSearchBox] = useState(false);
  const [searchText, setSearchText] = useState("");

  const user = useSelector((state) => state.user);
  const isLogin = getAccessToken() ? true : false;

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth <= 650);
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
    setMenuVisible(false);
  };

  const handleMouseContainer = () => {
    setMenuVisible(false);
  };

  useEffect(() => {
    if (!screenSize) setSideModal(false);
  });

  useEffect(() => {}, [searchText]);

  return (
    <>
      <header>
        {/* searchbar */}
        <div className="logoBar">
          <div>
            <a>
              {screenSize ? (
                <img
                  src={menu}
                  onClick={() => {
                    setSideModal(!sideModal);
                  }}
                />
              ) : (
                <img src={search} style={{ display: "none" }} />
              )}
            </a>
            {searchBox && (
              <SearchBox
                type="text"
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
            )}
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
          <nav className="navbar">
            <ul>
              <li>
                <Link to={`/category/best`} style={{ fontWeight: "bold" }}>
                  <a>Best</a>
                </Link>
              </li>
              <li>
                <Link to={`/category/1`}>
                  <a>캐릭터</a>
                </Link>
              </li>
              <li>
                <Link to={`/category/2`}>
                  <a>데이지</a>
                </Link>
              </li>
              <li>
                <Link to={`/category/3`}>
                  <a>레터링</a>
                </Link>
              </li>
              <li>
                <Link to={`/category/4`}>
                  <a>용돈</a>
                </Link>
              </li>
              <li>
                <Link to={`/category/5`}>
                  <a>옴브레</a>
                </Link>
              </li>
              <li>
                <Link to={`/category/6`}>
                  <a>장미</a>
                </Link>
              </li>
              <li>
                <Link to={`/category/7`}>
                  <a>튤립</a>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>
      {sideModal && (
        <SidebarMenu isOpen={sideModal} onClose={() => setSideModal(false)} />
      )}
    </>
  );
}

const SearchBox = styled.input`
  border: none;
  background-color: #dddddd78;
`;

const Sidebar = styled.nav`
  margin-top: 60px;
  width: 200px;
  height: 100%;
  position: fixed;
  text-align: center;
  top: 0;
  left: 0;
  z-index: 998;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  transition: top 0.3s ease-in-out;
  overflow-y: auto;
`;

const MenuList = styled.ul`
  list-style-type: none;
  padding: 20px;
  margin: 10px 0px;
`;

const MenuItem = styled.li`
  margin-bottom: 15px;
  font-size: 16px;
  margin-top: 24px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #5a5a5a;
  font-weight: bold;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #7a7a7a;
  }
`;
const SearchImg = styled.div`
  text-decoration: none;
  color: #5a5a5a;
  font-weight: bold;
  transition: color 0.3s ease-in-out;
`;

const SidebarMenu = ({ isOpen, onClose }) => {
  return (
    <Sidebar style={{ left: isOpen ? "0" : "-250px" }}>
      <MenuList>
        <MenuItem>
          <NavLink to="/category/best" onClick={onClose}>
            Best
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/category/1" onClick={onClose}>
            캐릭터
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/category/2" onClick={onClose}>
            데이지
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/category/3" onClick={onClose}>
            레터링
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/category/4" onClick={onClose}>
            용돈
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/category/5" onClick={onClose}>
            옴브레
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/category/6" onClick={onClose}>
            장미
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/category/7" onClick={onClose}>
            튤립
          </NavLink>
        </MenuItem>
      </MenuList>
    </Sidebar>
  );
};

export default Navbar;
