import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import MainPage from "./pages/mainPage/MainPage";
import LoginPage from "./pages/mainPage/Registers/LoginPage";
import RegisterPage from "./pages/mainPage/Registers/RegisterPage";
import FindIdPage from "./pages/mainPage/Registers/FindIdPage";
import FindPwPage from "./pages/mainPage/Registers/FindPwPage";
import NewPwPage from "./pages/mainPage/Registers/NewPwPage";
import MyPage from "./pages/mainPage/mypage/MyPage";
import CartPage from "./pages/mainPage/CartPage";
// admin
import AdminPageMain from "./pages/adminPage/AdminPageMain";
import MainDashBoard from "./pages/adminPage/MainDashBoard";
import Products from "./pages/adminPage/Products";
import ProductsAdd from "./pages/adminPage/ProductsAdd";
import Orders from "./pages/adminPage/Orders";
import Users from "./pages/adminPage/Users";
import NotFound from "./shared/NotFound404";
import ProductsDetail from "./pages/adminPage/ProductsDetail";
import ProductDetailsPage from "./pages/mainPage/products/ProductDetailsPage";
import BestPage from "./pages/mainPage/products/BestPage";
import CategoryPage from "./pages/mainPage/products/CategoryPage";
import OrderListPage from "./pages/mainPage/payment/OrderListPage";
import MyPageInfo from "./pages/mainPage/mypage/MyPageInfo";
import WishList from "./pages/mainPage/mypage/WishList";
import ChangePw from "./pages/mainPage/mypage/ChangePw";
import DeliveryList from "./pages/mainPage/mypage/DeliveryList";

const MyPageGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // 토큰 저장 방식에 따라 수정

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/findId" element={<FindIdPage />} />
        <Route path="/findPw" element={<FindPwPage />} />
        <Route path="/mypage/*" element={<MyPage />}>
          <Route path="delivery" element={<DeliveryList />} />
          <Route path="info" element={<MyPageInfo />} />
          <Route path="wishlist" element={<WishList />} />
          {/* <Route path="pwmodify" element={<ChangePw />} /> */}
        </Route>
        <Route path="/category/best" element={<BestPage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route
          path="/payment/orderList/:productId"
          element={<OrderListPage />}
        />
        <Route path="/cart" element={<CartPage />} />
        {/* <Route path="/cart/checkout" element={<CheckoutPage />} /> */}
        {/* admin */}
        <Route path="/admin/*" element={<AdminPageMain />}>
          <Route path="dashboard" element={<MainDashBoard />} />
          <Route path="products/*" element={<Products />} />
          <Route path="products/add" element={<ProductsAdd />} />
          <Route path="products/:productId" element={<ProductsDetail />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
